import { parseUrlDetails, URL_REGEX, OBFUSCATED_URL_REGEX } from './urlAnalyzer.js';
import { isRangeInsideNegation } from './negation.js';

/**
 * 1. Fake Urgency (+20 points)
 * Detects artificial pressure to act swiftly before thinking.
 */
export function checkFakeUrgency(text, weights) {
  const points = weights.fakeUrgency ?? 20;
  const matches = [];

  const patterns = [
    // Standard English urgency keywords
    /\b(?:urgent(?:ly)?|immediately|today|right\s+now|last\s+chance|act\s+now|expires\s+soon|within\s+\d+\s*(?:hours?|hrs?|mins?|minutes?)|hurry|limited\s+time|final\s+notice|action\s+required\s+today|deadline)\b/gi,
    // Hinglish urgency keywords
    /\b(?:turant|abhi\s*(?:ke\s*abhi)?|jaldi|foran|fauran|turant\s+karein)\b/gi,
  ];

  for (const pattern of patterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        text: match[0],
        ruleId: 'fake_urgency',
        name: 'Artificial Urgency',
        category: 'urgency',
        points,
        why: `Creates false panic ("${match[0]}") to pressure you into acting without verifying.`,
        action: 'Pause and take a breath. Legitimate institutions give reasonable grace periods and never demand instant actions within minutes.',
      });
    }
  }

  return matches;
}

/**
 * 2. Account Threat (+15 points)
 * Detects threats to block services, freeze funds, or fabricate legal consequences.
 */
export function checkAccountThreat(text, weights) {
  const points = weights.accountThreat ?? 15;
  const matches = [];

  const patterns = [
    // Account / SIM / Card blockage or suspension
    /\b(?:(?:account|card|sim|service|power|electricity|connection)\s+(?:will\s+be\s+)?(?:blocked|suspended|closed|deactivated|frozen|terminated|disconnected))\b/gi,
    /\b(?:blocked\s+today|card\s+will\s+be\s+blocked|account\s+blocked)\b/gi,
    
    // KYC incomplete or expired
    /\b(?:kyc\s+(?:is\s+)?(?:incomplete|expired|pending|required|not\s+updated|update\s+needed))\b/gi,
    /\b(?:update\s+kyc|link\s+(?:pan|aadhaar)\s+card|kyc\s+verification)\b/gi,

    // Legal / arrest / digital arrest / penalties
    /\b(?:legal\s+action|digital\s+arrest|arrest\s+warrant|police\s+(?:complaint|custody|case)|fir\s+registered|court\s+notice|penalty\s+of\s+rs|money\s+laundering\s+case|cbi\s+notice|customs\s+seizure)\b/gi,
  ];

  for (const pattern of patterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        text: match[0],
        ruleId: 'account_threat',
        name: 'Account Threat / Digital Arrest',
        category: 'threat',
        points,
        why: `Threatens severe consequences ("${match[0]}") to trigger panic and compliance.`,
        action: 'Never follow links in threat messages. Contact the official service provider via their verified app or phone number on your bank card.',
      });
    }
  }

  return matches;
}

/**
 * 3. Suspicious Link (+25 points / +15 points for unverified)
 * Detects shorteners, deceptive domains, non-HTTPS protocols, risky TLDs, and obfuscated text links.
 */
export function checkSuspiciousLinks(text, weights) {
  const matches = [];
  const fullSuspiciousPoints = weights.suspiciousLink ?? 25;
  const unverifiedPoints = weights.unverifiedLink ?? 15;

  // 1. Check obfuscated text like "sbi [dot] com"
  let obfMatch;
  const obfRegex = new RegExp(OBFUSCATED_URL_REGEX.source, OBFUSCATED_URL_REGEX.flags);
  while ((obfMatch = obfRegex.exec(text)) !== null) {
    matches.push({
      startIndex: obfMatch.index,
      endIndex: obfMatch.index + obfMatch[0].length,
      text: obfMatch[0],
      ruleId: 'suspicious_link',
      name: 'Obfuscated Link Trick',
      category: 'link',
      points: fullSuspiciousPoints,
      urlDetails: { raw: obfMatch[0], isObfuscated: true },
      why: `Uses obfuscated spacing or "[dot]" (${obfMatch[0]}) to evade automated spam and phishing filters.`,
      action: 'Do not re-assemble or open this address. Legitimate organizations write standard, valid web addresses.',
    });
  }

  // 2. Check standard and shortener URLs
  let urlMatch;
  const urlRegex = new RegExp(URL_REGEX.source, URL_REGEX.flags);
  while ((urlMatch = urlRegex.exec(text)) !== null) {
    const rawUrl = urlMatch[0];
    const details = parseUrlDetails(rawUrl);

    // Whitelisted official domain with HTTPS is a Good Sign!
    if (details.isWhitelisted && !details.isInsecure) {
      matches.push({
        startIndex: urlMatch.index,
        endIndex: urlMatch.index + rawUrl.length,
        text: rawUrl,
        ruleId: 'good_sign_domain',
        name: 'Official Whitelisted Domain',
        category: 'good',
        points: 0,
        urlDetails: details,
        why: `Points to an officially verified domain (${details.domain}) over a secure HTTPS connection.`,
        action: 'Domain is authentic. Always double-check browser address bar padlock when typing sensitive information.',
      });
      continue;
    }

    // Determine why it is suspicious
    let reasons = [];
    let isHeavySuspicion = false;

    if (details.isShortener) {
      reasons.push(`URL shortener (${details.domain}) conceals the true destination`);
      isHeavySuspicion = true;
    }
    if (details.isRiskyTld) {
      reasons.push(`Risky or non-standard web ending (${details.tld}) frequently leveraged by scammers`);
      isHeavySuspicion = true;
    }
    if (details.brandTarget) {
      reasons.push(`Imitates brand "${details.brandTarget.name}" on an unofficial domain (${details.host})`);
      isHeavySuspicion = true;
    }
    if (details.isInsecure) {
      reasons.push('Uses insecure HTTP instead of encrypted HTTPS');
      isHeavySuspicion = true;
    }
    if (details.isIp) {
      reasons.push('Direct raw IP address rather than a branded domain name');
      isHeavySuspicion = true;
    }

    const assignedPoints = isHeavySuspicion ? fullSuspiciousPoints : unverifiedPoints;
    const whySummary = reasons.length > 0 
      ? reasons.join('; ') + '.' 
      : `Unverified link to non-whitelisted domain "${details.domain}".`;

    matches.push({
      startIndex: urlMatch.index,
      endIndex: urlMatch.index + rawUrl.length,
      text: rawUrl,
      ruleId: 'suspicious_link',
      name: isHeavySuspicion ? 'Deceptive or Insecure Link' : 'Unverified External Link',
      category: 'link',
      points: assignedPoints,
      urlDetails: details,
      why: whySummary,
      action: 'Do not click or tap this link. If you suspect an issue with your account, type the bank or service URL directly in your browser.',
    });
  }

  return matches;
}

/**
 * 4. OTP or Password Harvesting (+40 points)
 * Detects calls to share or disclose sensitive authentication secrets.
 * Must NOT trigger when covered by protective negation!
 */
export function checkOtpHarvesting(text, weights, negationMatches = []) {
  const points = weights.otpHarvesting ?? 40;
  const matches = [];

  // Match: (share|send|tell|enter|read out|provide|verify) ... (OTP|PIN|CVV|password|card number|Aadhaar)
  const otpActionRegex = /\b(?:share|send|tell|enter|read\s*out|provide|verify|submit|confirm|fill)\b[\s\S]{0,40}?\b(?:otp|one\s*time\s*password|pin|cvv|password|passcode|upi\s*pin|card\s*number|aadhaar(?:\s*number)?)\b/gi;

  let match;
  while ((match = otpActionRegex.exec(text)) !== null) {
    const start = match.index;
    const end = match.index + match[0].length;

    // False-alarm protection: Ignore if this match is inside a protective negation warning!
    if (isRangeInsideNegation(start, end, negationMatches)) {
      continue;
    }

    matches.push({
      startIndex: start,
      endIndex: end,
      text: match[0],
      ruleId: 'otp_harvesting',
      name: 'Credential or OTP Harvesting Request',
      category: 'otp',
      points,
      why: `Demands that you reveal or verify confidential secrets ("${match[0]}").`,
      action: 'CRITICAL: Banks, government portals, and police NEVER ask you to disclose an OTP, PIN, or CVV. Never share it under any circumstances.',
    });
  }

  return matches;
}

/**
 * 5. Money or Prize Bait (+25 points)
 * Detects lottery wins, fake refunds, processing fees, task earnings, or redelivery payments.
 */
export function checkMoneyBait(text, weights) {
  const points = weights.moneyBait ?? 25;
  const matches = [];

  const patterns = [
    /\b(?:you\s+have\s+won|won\s+(?:a\s+)?(?:lottery|prize|car|cash|reward))\b/gi,
    /\b(?:cashback\s+of\s+rs|lottery\s+amount|lucky\s+draw|congratulations\s+winner)\b/gi,
    /\b(?:pay\s+(?:re-?delivery|processing|courier|dispatch|customs|registration|job)\s+fee)\b/gi,
    /\b(?:advance\s+payment|part-?time\s+job\s+earnings|task\s+(?:commission|salary)|earn\s+rs\s*\d+\s*(?:daily|per\s+day))\b/gi,
    /\b(?:refund\s+(?:of\s+rs|approved|credited|claim\s+now))\b/gi,
    /\b(?:reward\s+points?\s+(?:expir(?:ed|ing)|worth\s+rs))\b/gi,
  ];

  for (const pattern of patterns) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        text: match[0],
        ruleId: 'money_bait',
        name: 'Financial Bait / Fee Request',
        category: 'money',
        points,
        why: `Promises free wealth or demands small "fees" ("${match[0]}") to lure you into paying or revealing payment details.`,
        action: 'Remember: Real lottery, delivery companies, or recruiters never ask for upfront "clearance or redelivery fees" to release packages or prizes.',
      });
    }
  }

  return matches;
}

/**
 * 6. Vague Greeting (+10 points)
 * Detects generic mass-targeted impersonal greetings.
 */
export function checkVagueGreeting(text, weights) {
  const points = weights.vagueGreeting ?? 10;
  const matches = [];

  // Match: Dear customer / user / account holder / Sir/Madam at start or near start
  const pattern = /\b(?:dear\s+(?:customer|user|account\s*holder|client|member|sir[\s/]*madam|consumer|cardholder))\b/gi;

  let match;
  while ((match = pattern.exec(text)) !== null) {
    matches.push({
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      text: match[0],
      ruleId: 'vague_greeting',
      name: 'Impersonal Generic Greeting',
      category: 'greeting',
      points,
      why: `Uses a generic salutation ("${match[0]}") instead of addressing you by your actual name on file.`,
      action: 'Legitimate banks and services where you have an account typically greet you with your registered first or full name.',
    });
  }

  return matches;
}
