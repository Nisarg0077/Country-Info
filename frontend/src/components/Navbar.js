/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./image/globe-svgrepo-com.svg";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-screen-xl px-4">
      <div className="liquid-glass-navbar mx-auto flex items-center justify-between rounded-3xl border border-white/30 bg-white/10 px-8 py-4 shadow-2xl backdrop-blur-3xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 group"
          onClick={closeMenu}
        >
          <img
            src={Logo}
            className="h-9 w-9 transition-transform duration-300 group-hover:scale-110"
            alt="Countries Info Logo"
          />
          <span className="text-2xl font-semibold text-white tracking-tighter">
            Country Info
          </span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-3 text-white rounded-2xl hover:bg-white/10 transition-all"
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-2">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Slide Down Mobile Menu */}
      <div
        className={`liquid-glass-navbar mx-auto mt-3 overflow-hidden rounded-3xl border border-white/30 bg-white/10 px-6 py-6 shadow-2xl backdrop-blur-3xl transition-all duration-300 ease-out md:hidden ${
          isMenuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 text-lg">
          <Link
            to="/"
            onClick={closeMenu}
            className={`nav-link-mobile py-3 px-4 rounded-2xl ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className={`nav-link-mobile py-3 px-4 rounded-2xl ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className={`nav-link-mobile py-3 px-4 rounded-2xl ${isActive("/contact") ? "active" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
