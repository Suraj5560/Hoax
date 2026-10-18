/**
 * Detects protective negation phrases that advise the user NOT to share confidential credentials.
 * Negation turns potential alarm into a 'Good sign' (0 points).
 */

const NEGATION_PATTERNS = [
  // English: Do not share this OTP / Never disclose PIN
  /(?:do\s+not|don'?t|never|should\s+not|must\s+not)\s+(?:share|disclose|give|tell|reveal|forward)\s+(?:this\s+)?(?:otp|one\s*time\s*password|pin|cvv|password|details|credentials|code)(?:\s+(?:with|to)\s+(?:anyone|anybody|any\s*person))?/gi,
  
  // Bank warning: Bank never asks for OTP
  /(?:bank|amazon|flipkart|official)\s+(?:never|will\s+never)\s+(?:asks?|demands?|calls?\s+for)\s+(?:your\s+)?(?:otp|pin|cvv|password)/gi,

  // Hinglish / Hindi: OTP kisi ke sath share na karein / mat batao
  /(?:otp|pin|password)\s+(?:kisi\s+ko|kisi\s+ke\s+sath)\s+(?:bhi\s+)?(?:share\s+na\s+karein|mat\s+(?:karein|batao|do)|na\s+dein)/gi,
  /(?:kisi\s+ko\s+bhi\s+)?(?:otp|pin)\s+(?:mat\s+batao|share\s+mat\s+karo|mat\s+dein)/gi,
];

/**
 * Checks if the text contains protective negation.
 * Returns array of matches with start/end indices.
 */
export function detectProtectiveNegation(text) {
  const matches = [];
  
  for (const pattern of NEGATION_PATTERNS) {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        text: match[0],
        ruleId: 'good_sign_negation',
        name: 'Legitimate Safety Warning',
        category: 'good',
        points: 0,
        why: 'Explicitly warns you NOT to share your OTP or credentials with anyone — a trademark of legitimate security notices.',
        action: 'Keep this OTP private. As instructed, never tell or forward it to anyone claiming to be a bank agent.',
      });
    }
  }

  return matches;
}

/**
 * Checks if an index range falls within any detected protective negation range.
 */
export function isRangeInsideNegation(startIndex, endIndex, negationMatches) {
  return negationMatches.some(neg => {
    return (
      (startIndex >= neg.startIndex && startIndex < neg.endIndex) ||
      (endIndex > neg.startIndex && endIndex <= neg.endIndex) ||
      (startIndex <= neg.startIndex && endIndex >= neg.endIndex)
    );
  });
}
