import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import AppPage from './pages/AppPage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import SafetyPage from './pages/SafetyPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import HoaxChatbot from './components/ai/HoaxChatbot.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-cloud dark:bg-cloud-dark text-indigo-950 dark:text-indigo-100 transition-colors font-sans selection:bg-lilac-haze selection:text-indigo-900">
          <Navbar />
          <main id="main-content" className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<AppPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Fallback route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <HoaxChatbot />
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
