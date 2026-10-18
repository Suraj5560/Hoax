/**
 * Default rule points, thresholds, and official domain whitelist.
 * Tunable via the What-If Tuner.
 */

export const DEFAULT_THRESHOLDS = {
  lowMax: 29,       // 0 - 29: LOW
  mediumMax: 59,    // 30 - 59: MEDIUM
  highMin: 60,      // 60 - 100: HIGH
};

export const DEFAULT_WEIGHTS = {
  fakeUrgency: 20,
  accountThreat: 15,
  suspiciousLink: 25,
  unverifiedLink: 15,
  otpHarvesting: 40,
  moneyBait: 25,
  vagueGreeting: 10,
  comboBonusLinkOtp: 10,
};

export const OFFICIAL_DOMAINS_WHITELIST = [
  'sbi.co.in',
  'onlinesbi.sbi',
  'hdfcbank.com',
  'icicibank.com',
  'axisbank.com',
  'amazon.in',
  'amazon.com',
  'flipkart.com',
  'irctc.co.in',
  'indiapost.gov.in',
  'uidai.gov.in',
  'incometax.gov.in',
  'rbi.org.in',
  'npci.org.in',
  'paytm.com',
];

export const KNOWN_BRAND_TARGETS = [
  { name: 'State Bank of India (SBI)', matchRegex: /\b(sbi|state\s*bank)\b/i, officialDomain: 'sbi.co.in' },
  { name: 'HDFC Bank', matchRegex: /\b(hdfc|hdfc\s*bank)\b/i, officialDomain: 'hdfcbank.com' },
  { name: 'ICICI Bank', matchRegex: /\b(icici|icici\s*bank)\b/i, officialDomain: 'icicibank.com' },
  { name: 'Axis Bank', matchRegex: /\b(axis|axis\s*bank)\b/i, officialDomain: 'axisbank.com' },
  { name: 'Amazon India', matchRegex: /\b(amazon|amzn)\b/i, officialDomain: 'amazon.in' },
  { name: 'Flipkart', matchRegex: /\bflipkart\b/i, officialDomain: 'flipkart.com' },
  { name: 'India Post', matchRegex: /\b(india\s*post|post\s*office|parcel|delivery)\b/i, officialDomain: 'indiapost.gov.in' },
  { name: 'Income Tax Dept', matchRegex: /\b(income\s*tax|itr|refund)\b/i, officialDomain: 'incometax.gov.in' },
  { name: 'IRCTC Railway', matchRegex: /\b(irctc|railway)\b/i, officialDomain: 'irctc.co.in' },
];

export const URL_SHORTENERS = [
  'bit.ly',
  'tinyurl.com',
  'is.gd',
  't.co',
  'cutt.ly',
  'rb.gy',
  'goo.gl',
  'ow.ly',
  'buff.ly',
  'bl.ink',
  'shorturl.at',
];

export const RISKY_TLDS = [
  '.xyz',
  '.top',
  '.click',
  '.example',
  '.work',
  '.link',
  '.rest',
  '.site',
  '.online',
  '.loan',
  '.racing',
  '.tokyo',
  '.vip',
  '.info',
];

export const SAMPLE_MESSAGES = {
  sbiKycScam: `SBI ALERT: Your KYC is incomplete and your account will be blocked today. Update immediately at http://sbi-kyc-update.example/verify and share the OTP you receive to confirm.`,
  deliveryScam: `Dear customer, pay redelivery fee Rs 25 within 2 hours at bit.ly/xyz or parcel returned`,
  realBankOtp: `123456 is your OTP for Rs 499 at Amazon. Do not share this OTP with anyone.`,
  realOrderUpdate: `Hi Asha, your Amazon order has shipped. Track at https://www.amazon.in/orders`,
  digitalArrestScam: `URGENT NOTICE: Delhi Police Cyber Crime Cell has issued a digital arrest warrant against your Aadhaar for illegal money laundering. Transfer penalty Rs 50,000 immediately to avoid arrest: http://police-case-clearance.click`,
  electricityScam: `Dear consumer, your electricity power will be disconnected tonight 9:30 PM because previous month bill was not updated. Please immediately contact our power officer at 9876543210 or visit http://wbseb-billpay.xyz`,
};
