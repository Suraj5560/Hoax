import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Scanner Station', path: '/app' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Safety & Emergency', path: '/safety' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-cloud/90 dark:bg-cloud-dark/90 border-b border-indigo-900/10 dark:border-lilac-haze/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo: Hoax */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-indigo-ink rounded-lg p-1"
          aria-label="Hoax Homepage"
        >
          <div className="w-10 h-10 rounded-surface-sm bg-gradient-to-br from-indigo-ink via-indigo-600 to-lilac-haze flex items-center justify-center shadow-soft-indigo text-white transform group-hover:scale-105 transition-transform duration-200">
            <Shield className="w-5 h-5 fill-white/20 stroke-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-2xl tracking-tight text-indigo-ink dark:text-white leading-none">
              Hoax
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-control text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-indigo-ink/10 text-indigo-ink font-semibold dark:bg-lilac-haze/20 dark:text-white'
                  : 'text-indigo-ink/70 hover:text-indigo-ink hover:bg-white/60 dark:text-lilac-haze/80 dark:hover:text-white dark:hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-control text-indigo-ink dark:text-lilac-haze hover:bg-white/80 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-alert" />}
          </button>

          {/* Start Checking CTA button with generous left-right padding */}
          <Link
            to="/app"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-control font-heading font-bold text-sm text-white bg-indigo-ink hover:bg-indigo-600 dark:bg-lilac-haze dark:text-indigo-ink dark:hover:bg-white shadow-soft-indigo hover:shadow-elevated-indigo transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start Checking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-control text-indigo-ink dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-indigo-900/10 dark:border-lilac-haze/15 bg-cloud dark:bg-cloud-dark px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-control text-base font-medium ${
                isActive(link.path)
                  ? 'bg-indigo-ink text-white dark:bg-lilac-haze dark:text-indigo-ink'
                  : 'text-indigo-ink dark:text-white hover:bg-white/80 dark:hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-control font-heading font-bold text-white bg-indigo-ink hover:bg-indigo-600 shadow-soft-indigo"
            >
              <span>Launch Fraud Scanner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
