/**
 * Developer Configuration for Groq AI Backend
 * 
 * Paste your Groq API Key here (or set VITE_GROQ_API_KEY in your .env file).
 * End-users will never see or interact with any API keys.
 */

export const GROQ_DEV_CONFIG = {
  // Developer can paste their Groq API Key (starts with gsk_...) here:
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.6,
  max_tokens: 650,
};
