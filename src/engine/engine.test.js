import { describe, it, expect } from 'vitest';
import { analyzeMessage } from './analyzer.js';
import { parseUrlDetails, computeLetterDiff } from './urlAnalyzer.js';

describe('Scam Spotter Rule Engine — Acceptance Tests', () => {

  it('Test 1: SBI KYC Scam message triggers 100/100 HIGH with four distinct findings', () => {
    const input = 'SBI ALERT: Your KYC is incomplete and your account will be blocked today. Update immediately at http://sbi-kyc-update.example/verify and share the OTP you receive to confirm.';
    const result = analyzeMessage(input);

    expect(result.isValid).toBe(true);
    expect(result.score).toBe(100);
    expect(result.riskLevel).toBe('HIGH');

    const ruleIds = result.findings.map(f => f.ruleId);
    expect(ruleIds).toContain('fake_urgency');
    expect(ruleIds).toContain('account_threat');
    expect(ruleIds).toContain('suspicious_link');
    expect(ruleIds).toContain('otp_harvesting');
    expect(result.hasComboBonus).toBe(true);

    // Verify highlights are captured and mapped
    expect(result.highlightList.length).toBeGreaterThanOrEqual(4);
  });

  it('Test 2: Amazon OTP message with protective negation scores 0-9 LOW with Good Sign', () => {
    const input = '123456 is your OTP for Rs 499 at Amazon. Do not share this OTP with anyone.';
    const result = analyzeMessage(input);

    expect(result.isValid).toBe(true);
    expect(result.score).toBeLessThanOrEqual(9);
    expect(result.riskLevel).toBe('LOW');

    // Negation was caught and marked under good signs
    expect(result.goodSigns.length).toBeGreaterThan(0);
    expect(result.goodSigns.some(g => g.ruleId === 'good_sign_negation')).toBe(true);

    // Should NOT have triggered malicious OTP harvesting
    const ruleIds = result.findings.map(f => f.ruleId);
    expect(ruleIds).not.toContain('otp_harvesting');
  });

  it('Test 3: Amazon Order tracking message scores LOW with official-domain good sign', () => {
    const input = 'Hi Asha, your Amazon order has shipped. Track at https://www.amazon.in/orders';
    const result = analyzeMessage(input);

    expect(result.isValid).toBe(true);
    expect(result.score).toBeLessThan(30);
    expect(result.riskLevel).toBe('LOW');

    // Official domain recognized
    expect(result.goodSigns.some(g => g.ruleId === 'good_sign_domain')).toBe(true);
  });

  it('Test 4: Delivery fee scam scores HIGH (urgency, bait, shortener, greeting)', () => {
    const input = 'Dear customer, pay redelivery fee Rs 25 within 2 hours at bit.ly/xyz or parcel returned';
    const result = analyzeMessage(input);

    expect(result.isValid).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.riskLevel).toBe('HIGH');

    const ruleIds = result.findings.map(f => f.ruleId);
    expect(ruleIds).toContain('vague_greeting');
    expect(ruleIds).toContain('fake_urgency');
    expect(ruleIds).toContain('money_bait');
    expect(ruleIds).toContain('suspicious_link');
  });

  it('Test 5: Empty input and short strings return friendly error without crashing or scoring', () => {
    const emptyResult = analyzeMessage('');
    expect(emptyResult.isValid).toBe(false);
    expect(emptyResult.error).toBeDefined();

    const shortResult = analyzeMessage('hi');
    expect(shortResult.isValid).toBe(false);
    expect(shortResult.error).toContain('too short');
  });

  it('Test 6: Stress test with 5000+ characters, emoji, Hindi script, and multiple links runs without freeze', () => {
    const baseText = 'तुरंत सावधान: आपका खाता बंद हो जाएगा! Please pay Rs 500 fee at http://fake-bank-pay.click and verify OTP. ';
    const emojiPadded = '🚨 ⚠️ 💳 '.repeat(20);
    const longText = baseText.repeat(50) + emojiPadded;
    expect(longText.length).toBeGreaterThan(5000);

    const startTime = performance.now();
    const result = analyzeMessage(longText);
    const duration = performance.now() - startTime;

    expect(result.isValid).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.annotatedSegments.length).toBeGreaterThan(0);
    expect(duration).toBeLessThan(500); // Must be fast and non-blocking
  });

  it('What-if Tuner: Recalculates dynamically when weights change', () => {
    const input = 'Dear customer, pay redelivery fee Rs 25 within 2 hours at bit.ly/xyz or parcel returned';
    
    // Normal analysis
    const defaultRes = analyzeMessage(input);
    const defaultScore = defaultRes.score;

    // Zero out suspiciousLink and fakeUrgency weights
    const tunedRes = analyzeMessage(input, {
      suspiciousLink: 0,
      fakeUrgency: 0,
    });

    expect(tunedRes.score).toBeLessThan(defaultScore);
  });

  it('Link X-Ray: Accurately parses domain parts and detects lookalike brand diff', () => {
    const fakeUrl = 'http://sbi-kyc-update.example/verify';
    const details = parseUrlDetails(fakeUrl);

    expect(details.scheme).toBe('http');
    expect(details.host).toBe('sbi-kyc-update.example');
    expect(details.tld).toBe('example');
    expect(details.isRiskyTld).toBe(true);
    expect(details.isInsecure).toBe(true);
    expect(details.brandTarget).toBeDefined();
    expect(details.brandTarget.officialDomain).toBe('sbi.co.in');

    const diff = computeLetterDiff(details.host, 'sbi.co.in');
    expect(diff.diffList.length).toBeGreaterThan(0);
  });

});
