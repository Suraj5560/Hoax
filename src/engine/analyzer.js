import { DEFAULT_WEIGHTS, DEFAULT_THRESHOLDS } from './constants.js';
import { detectProtectiveNegation } from './negation.js';
import {
  checkFakeUrgency,
  checkAccountThreat,
  checkSuspiciousLinks,
  checkOtpHarvesting,
  checkMoneyBait,
  checkVagueGreeting,
} from './rules.js';

/**
 * Merges overlapping text highlight spans, keeping the longer span
 */
export function mergeHighlights(highlights) {
  if (!highlights || highlights.length === 0) return [];

  // Sort by start position ascending; if tied, by length descending
  const sorted = [...highlights].sort((a, b) => {
    if (a.startIndex !== b.startIndex) {
      return a.startIndex - b.startIndex;
    }
    return (b.endIndex - b.startIndex) - (a.endIndex - a.startIndex);
  });

  const merged = [];
  let current = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];

    // Check for overlap or containment
    if (next.startIndex < current.endIndex) {
      // If next extends further, decide whether to keep current or extend
      if (next.endIndex > current.endIndex) {
        // Keep the one with higher severity or longer span
        const currentLen = current.endIndex - current.startIndex;
        const nextLen = next.endIndex - next.startIndex;
        if (nextLen > currentLen) {
          current = next;
        }
      }
      // If contained within current, skip next
    } else {
      merged.push(current);
      current = next;
    }
  }

  merged.push(current);
  return merged;
}

/**
 * Builds annotated segments for rendering highlighted message text
 */
export function buildAnnotatedSegments(text, highlights) {
  if (!text) return [];
  if (!highlights || highlights.length === 0) {
    return [{ text, isHighlight: false }];
  }

  const merged = mergeHighlights(highlights);
  const segments = [];
  let lastIndex = 0;

  for (const h of merged) {
    const start = Math.max(0, Math.min(h.startIndex, text.length));
    const end = Math.max(start, Math.min(h.endIndex, text.length));

    if (start > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, start),
        isHighlight: false,
      });
    }

    if (end > start) {
      segments.push({
        text: text.slice(start, end),
        isHighlight: true,
        finding: h,
      });
    }

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      isHighlight: false,
    });
  }

  return segments;
}

/**
 * Classifies the likely scam or message category
 */
function determineScamType(findings, score) {
  if (score < 30) {
    if (findings.some(f => f.ruleId === 'good_sign_negation')) {
      return 'Legitimate Transactional OTP';
    }
    if (findings.some(f => f.ruleId === 'good_sign_domain')) {
      return 'Verified Legitimate Notification';
    }
    return 'Normal / Low-Risk Message';
  }

  const ids = new Set(findings.map(f => f.ruleId));

  if (ids.has('account_threat') && ids.has('otp_harvesting')) {
    return 'Bank Account / KYC Deactivation Phishing';
  }
  if (ids.has('account_threat') && (findings.some(f => /arrest|police|fir|penalty/i.test(f.text || '')))) {
    return 'Digital Arrest / Legal Extortion Scam';
  }
  if (ids.has('money_bait') && ids.has('suspicious_link')) {
    return 'Fake Courier / Redelivery or Prize Phishing';
  }
  if (ids.has('otp_harvesting')) {
    return 'Credential / OTP Theft Scam';
  }
  if (ids.has('suspicious_link')) {
    return 'Malicious Link / Lookalike Phishing';
  }
  if (ids.has('fake_urgency') && ids.has('account_threat')) {
    return 'Urgent Account Freeze Threat';
  }

  return 'Suspicious High-Pressure Solicitation';
}

/**
 * Generates tailored safe next steps based on findings
 */
function buildNextSteps(findings, score) {
  const steps = [];

  if (score >= 60) {
    steps.push({
      id: 'step_no_click',
      priority: 'high',
      icon: 'ShieldAlert',
      title: 'Do not click, tap, or reply',
      description: 'Never click the link or send replies. Even typing "STOP" confirms your phone number is active to fraudsters.',
    });
  }

  const hasOtpFinding = findings.some(f => f.ruleId === 'otp_harvesting');
  if (hasOtpFinding) {
    steps.push({
      id: 'step_protect_otp',
      priority: 'critical',
      icon: 'KeyRound',
      title: 'Never reveal your OTP or PIN',
      description: 'No legitimate bank, electricity department, or police officer will ever ask for an OTP or PIN.',
    });
  }

  const hasThreat = findings.some(f => f.ruleId === 'account_threat');
  if (hasThreat) {
    steps.push({
      id: 'step_contact_bank',
      priority: 'high',
      icon: 'Building2',
      title: 'Verify only through official channels',
      description: 'Check your account status directly inside your bank official app, or dial the customer service number printed on the back of your debit card.',
    });
  }

  if (score >= 30) {
    steps.push({
      id: 'step_emergency_shared',
      priority: 'warning',
      icon: 'AlertTriangle',
      title: 'If you already shared an OTP or details',
      description: 'Call your bank immediate emergency fraud helpline to block your card/netbanking, then report immediately at cybercrime.gov.in or call 1930 (India National Helpline).',
    });
    steps.push({
      id: 'step_report_helpline',
      priority: 'normal',
      icon: 'PhoneCall',
      title: 'Report cyber fraud helpline 1930',
      description: 'Dial 1930 (Toll-Free in India) or file an incident complaint on cybercrime.gov.in to freeze stolen money before withdrawal.',
    });
  } else {
    steps.push({
      id: 'step_safe_keep',
      priority: 'safe',
      icon: 'CheckCircle2',
      title: 'Keep credentials private',
      description: 'This message appears routine. Keep your OTP confidential and ensure you are using official apps.',
    });
  }

  return steps;
}

/**
 * Main analysis function
 * Pure function: accepts text, optional weights, optional thresholds
 */
export function analyzeMessage(rawText, customWeights = {}, customThresholds = {}) {
  // 1. Input sanitization & validation
  if (!rawText || typeof rawText !== 'string') {
    return {
      isValid: false,
      error: 'Please enter a message to scan.',
      text: '',
    };
  }

  const text = rawText.trim();
  if (text.length === 0) {
    return {
      isValid: false,
      error: 'Please enter a message to scan.',
      text: '',
    };
  }

  if (text.length < 10) {
    return {
      isValid: false,
      error: 'Message is too short to evaluate accurately. Please paste the full text (at least 10 characters).',
      text,
    };
  }

  const weights = { ...DEFAULT_WEIGHTS, ...customWeights };
  const thresholds = { ...DEFAULT_THRESHOLDS, ...customThresholds };

  // 2. Detect protective negations (good signs)
  const negationMatches = detectProtectiveNegation(text);

  // 3. Execute detection rules
  const urgencyMatches = checkFakeUrgency(text, weights);
  const threatMatches = checkAccountThreat(text, weights);
  const linkMatches = checkSuspiciousLinks(text, weights);
  const otpMatches = checkOtpHarvesting(text, weights, negationMatches);
  const moneyMatches = checkMoneyBait(text, weights);
  const greetingMatches = checkVagueGreeting(text, weights);

  // Separate warning signs and good signs
  const allRawFindings = [
    ...urgencyMatches,
    ...threatMatches,
    ...linkMatches,
    ...otpMatches,
    ...moneyMatches,
    ...greetingMatches,
    ...negationMatches,
  ];

  const warningFindings = allRawFindings.filter(f => f.points > 0);
  const goodSigns = allRawFindings.filter(f => f.points === 0);

  // 4. Combination Bonus: Link + OTP together
  const hasSuspiciousLink = warningFindings.some(f => f.ruleId === 'suspicious_link');
  const hasOtpHarvesting = warningFindings.some(f => f.ruleId === 'otp_harvesting');
  let comboBonusFinding = null;

  if (hasSuspiciousLink && hasOtpHarvesting) {
    const comboPoints = weights.comboBonusLinkOtp ?? 10;
    comboBonusFinding = {
      ruleId: 'combo_link_otp',
      name: 'Phishing Synergy: Link + OTP Request',
      category: 'threat',
      points: comboPoints,
      text: 'Combined link and credential harvesting',
      why: 'Simultaneously directing you to a web link while prompting for OTP/credentials represents the most common phishing attack vector.',
      action: 'High-risk trap: Never enter OTPs or passwords into web pages sent via unsolicited SMS or messaging apps.',
      isComboBonus: true,
    };
  }

  // 5. Score Calculation
  // We sum distinct rule categories to make the receipt intuitive and explainable
  const receiptItems = [];
  const registeredRules = new Set();
  let rawScore = 0;

  for (const finding of warningFindings) {
    if (!registeredRules.has(finding.ruleId)) {
      registeredRules.add(finding.ruleId);
      receiptItems.push(finding);
      rawScore += finding.points;
    }
  }

  if (comboBonusFinding) {
    receiptItems.push(comboBonusFinding);
    rawScore += comboBonusFinding.points;
  }

  // Cap score at 100
  const finalScore = Math.min(100, Math.max(0, rawScore));

  // 6. Risk Level
  let riskLevel = 'LOW';
  if (finalScore >= thresholds.highMin) {
    riskLevel = 'HIGH';
  } else if (finalScore > thresholds.lowMax) {
    riskLevel = 'MEDIUM';
  }

  // Determine scam type & plain-language verdict
  const scamType = determineScamType([...receiptItems, ...goodSigns], finalScore);

  let verdict = '';
  if (riskLevel === 'HIGH') {
    verdict = `Critical risk detected (${finalScore}/100). This message displays ${receiptItems.length} classic indicators of fraud designed to compromise your funds or security.`;
  } else if (riskLevel === 'MEDIUM') {
    verdict = `Caution warranted (${finalScore}/100). Contains potential warning signs; verify independently before taking any requested action.`;
  } else {
    verdict = goodSigns.length > 0 
      ? `Low risk (${finalScore}/100). Verified safety indicators detected (e.g. standard security warnings or official domains).`
      : `Low risk (${finalScore}/100). No significant scam hallmarks or high-pressure tactics identified.`;
  }

  // Merged highlight list for visual annotation in message
  const highlightList = mergeHighlights(allRawFindings.filter(f => f.startIndex !== undefined && f.endIndex !== undefined));
  const annotatedSegments = buildAnnotatedSegments(text, highlightList);
  const nextSteps = buildNextSteps(receiptItems, finalScore);

  return {
    isValid: true,
    text,
    score: finalScore,
    rawScore,
    riskLevel,
    verdict,
    scamType,
    findings: receiptItems,
    goodSigns,
    allFindings: allRawFindings,
    highlightList,
    annotatedSegments,
    nextSteps,
    hasComboBonus: !!comboBonusFinding,
    thresholds,
    weights,
  };
}
