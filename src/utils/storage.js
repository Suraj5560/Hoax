/**
 * Safe localStorage wrapper with try/catch on every operation
 */

const STORAGE_KEYS = {
  SCAN_HISTORY: 'scam_spotter_history_v1',
  THEME: 'scam_spotter_theme',
  TUNER_SETTINGS: 'scam_spotter_tuner_settings',
};

export function getScanHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCAN_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading scan history from localStorage:', err);
    return [];
  }
}

export function saveScanToHistory(scanRecord) {
  try {
    const current = getScanHistory();
    // Prepend new record, keeping maximum 25 items
    const recordWithMeta = {
      id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: Date.now(),
      snippet: scanRecord.text.slice(0, 100),
      fullText: scanRecord.text,
      score: scanRecord.score,
      riskLevel: scanRecord.riskLevel,
      scamType: scanRecord.scamType,
      findingsCount: scanRecord.findings?.length || 0,
    };
    const updated = [recordWithMeta, ...current.filter(item => item.fullText !== scanRecord.text)].slice(0, 25);
    localStorage.setItem(STORAGE_KEYS.SCAN_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn('Error saving scan to localStorage:', err);
    return [];
  }
}

export function clearScanHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.SCAN_HISTORY);
    return true;
  } catch (err) {
    console.warn('Error clearing scan history:', err);
    return false;
  }
}

export function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  } catch {
    return 'light';
  }
}

export function saveStoredTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (err) {
    console.warn('Error saving theme to localStorage:', err);
  }
}

export function getStoredTunerSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TUNER_SETTINGS);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredTunerSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.TUNER_SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.warn('Error saving tuner settings to localStorage:', err);
  }
}
