import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredTheme,
  saveStoredTheme,
  getScanHistory,
  saveScanToHistory,
  clearScanHistory,
  getStoredTunerSettings,
  saveStoredTunerSettings,
} from '../utils/storage.js';
import { DEFAULT_WEIGHTS, DEFAULT_THRESHOLDS } from '../engine/constants.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // What-if Tuner state
  const [tunerWeights, setTunerWeights] = useState(() => {
    const saved = getStoredTunerSettings();
    return saved?.weights || DEFAULT_WEIGHTS;
  });

  const [tunerThresholds, setTunerThresholds] = useState(() => {
    const saved = getStoredTunerSettings();
    return saved?.thresholds || DEFAULT_THRESHOLDS;
  });

  const updateWeight = (key, val) => {
    setTunerWeights(prev => {
      const updated = { ...prev, [key]: Number(val) };
      saveStoredTunerSettings({ weights: updated, thresholds: tunerThresholds });
      return updated;
    });
  };

  const updateThreshold = (key, val) => {
    setTunerThresholds(prev => {
      const updated = { ...prev, [key]: Number(val) };
      saveStoredTunerSettings({ weights: tunerWeights, thresholds: updated });
      return updated;
    });
  };

  const resetTuner = () => {
    setTunerWeights(DEFAULT_WEIGHTS);
    setTunerThresholds(DEFAULT_THRESHOLDS);
    saveStoredTunerSettings({ weights: DEFAULT_WEIGHTS, thresholds: DEFAULT_THRESHOLDS });
  };

  // Scan history state
  const [history, setHistory] = useState(() => getScanHistory());

  const addScanRecord = (record) => {
    const updated = saveScanToHistory(record);
    setHistory(updated);
  };

  const clearAllHistory = () => {
    clearScanHistory();
    setHistory([]);
  };

  // Current scanning state
  const [inputMessage, setInputMessage] = useState('');
  const [scanResult, setScanResult] = useState(null);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        tunerWeights,
        tunerThresholds,
        updateWeight,
        updateThreshold,
        resetTuner,
        history,
        addScanRecord,
        clearAllHistory,
        inputMessage,
        setInputMessage,
        scanResult,
        setScanResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
