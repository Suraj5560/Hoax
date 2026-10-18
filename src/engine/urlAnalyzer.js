import { OFFICIAL_DOMAINS_WHITELIST, URL_SHORTENERS, RISKY_TLDS, KNOWN_BRAND_TARGETS } from './constants.js';

/**
 * Checks if a hostname matches any official domain or *.gov.in, *.ac.in, *.edu.in
 */
export function isWhitelistedDomain(hostname) {
  if (!hostname) return false;
  const cleanHost = hostname.toLowerCase().trim();

  // Explicit whitelist match
  if (OFFICIAL_DOMAINS_WHITELIST.some(d => cleanHost === d || cleanHost.endsWith('.' + d))) {
    return true;
  }

  // Suffix checks: .gov.in, .ac.in, .edu.in
  if (cleanHost.endsWith('.gov.in') || cleanHost.endsWith('.ac.in') || cleanHost.endsWith('.edu.in')) {
    return true;
  }

  return false;
}

/**
 * Regex for detecting URLs in text, including schemes, shorteners, and common domains.
 */
export const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>"{}|\\^`]+|(?:\b[a-zA-Z0-9-]+\.)+(?:com|in|co\.in|org|net|xyz|top|click|example|work|link|rest|site|online|gov\.in|ac\.in|edu\.in|ly|me|io|ai|co|app|to|gd|gl|by|cc)\b(?:\/[^\s<>"{}|\\^`]*)?/gi;

/**
 * Obfuscated URL patterns like 'sbi [dot] com' or 'bank(dot)com'
 */
export const OBFUSCATED_URL_REGEX = /\b([a-zA-Z0-9-]+)\s*(\[dot\]|\(dot\)|\s+dot\s+)\s*([a-zA-Z0-9.-]+)\b/gi;

/**
 * Parses and deconstructs a URL for Link X-Ray
 */
export function parseUrlDetails(rawString) {
  let urlStr = rawString.trim();
  let scheme = '';
  
  if (/^https?:\/\//i.test(urlStr)) {
    scheme = urlStr.match(/^https?:/i)[0].toLowerCase().replace(/:$/, '');
  } else {
    // Default scheme implied
    scheme = 'http';
    urlStr = 'http://' + urlStr;
  }

  try {
    const parsed = new URL(urlStr);
    const host = parsed.hostname.toLowerCase();
    const parts = host.split('.');
    
    let tld = '';
    let domain = '';
    let subdomain = '';

    if (parts.length >= 2) {
      if (parts.length >= 3 && (parts[parts.length - 1] === 'in' && ['co', 'gov', 'ac', 'edu'].includes(parts[parts.length - 2]))) {
        // e.g. sbi.co.in or amazon.co.in
        tld = parts.slice(-2).join('.');
        domain = parts[parts.length - 3] + '.' + tld;
        subdomain = parts.slice(0, -3).join('.');
      } else {
        tld = parts[parts.length - 1];
        domain = parts.slice(-2).join('.');
        subdomain = parts.slice(0, -2).join('.');
      }
    } else {
      domain = host;
    }

    const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
    const isShortener = URL_SHORTENERS.includes(domain) || URL_SHORTENERS.includes(host);
    const isRiskyTld = RISKY_TLDS.some(t => host.endsWith(t));
    const isInsecure = scheme === 'http';
    const isWhitelisted = isWhitelistedDomain(host);

    // Lookalike brand detection
    let brandTarget = null;
    let diffDetails = null;

    if (!isWhitelisted) {
      for (const brand of KNOWN_BRAND_TARGETS) {
        if (brand.matchRegex.test(host)) {
          brandTarget = brand;
          diffDetails = computeLetterDiff(host, brand.officialDomain);
          break;
        }
      }
    }

    return {
      raw: rawString,
      cleanUrl: urlStr,
      scheme,
      host,
      subdomain: subdomain || null,
      domain,
      tld,
      pathname: parsed.pathname + parsed.search + parsed.hash,
      isIp,
      isShortener,
      isRiskyTld,
      isInsecure,
      isWhitelisted,
      brandTarget,
      diffDetails,
    };
  } catch {
    return {
      raw: rawString,
      cleanUrl: rawString,
      scheme: 'unknown',
      host: rawString,
      subdomain: null,
      domain: rawString,
      tld: '',
      pathname: '',
      isIp: false,
      isShortener: false,
      isRiskyTld: false,
      isInsecure: true,
      isWhitelisted: false,
      brandTarget: null,
      diffDetails: null,
    };
  }
}

/**
 * Computes a character-by-character alignment and difference between fake domain and real domain
 */
export function computeLetterDiff(fakeHost, officialHost) {
  const result = [];
  const maxLen = Math.max(fakeHost.length, officialHost.length);

  for (let i = 0; i < maxLen; i++) {
    const fakeChar = fakeHost[i] || '';
    const realChar = officialHost[i] || '';

    if (fakeChar === realChar) {
      result.push({ char: fakeChar, status: 'match', realChar });
    } else if (!fakeChar && realChar) {
      result.push({ char: '', status: 'missing', realChar });
    } else if (fakeChar && !realChar) {
      result.push({ char: fakeChar, status: 'inserted', realChar: '' });
    } else {
      result.push({ char: fakeChar, status: 'mismatch', realChar });
    }
  }

  return {
    fakeHost,
    officialHost,
    diffList: result,
  };
}
