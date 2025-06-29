
   'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans leading-relaxed">
        {/* Navbar */}
        <nav className="bg-transparent sticky top-0 z-50 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
              MyDevBlog
            </h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 text-base sm:text-lg font-medium text-gray-800">
              {['Home', 'Dashboard', 'About', 'Contact'].map((label) => {
                const href = label === 'Home' ? '/' : label === 'Dashboard' ? '/admin' : `/#${label.toLowerCase()}`;
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className="relative hover:text-blue-600 transition-all duration-300 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-2xl text-blue-700">
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow-md border-t border-gray-100">
              <ul className="flex flex-col items-center gap-4 py-4 text-lg font-medium">
                {['Home', 'Dashboard', 'About', 'Contact'].map((label) => {
                  const href = label === 'Home' ? '/' : label === 'Dashboard' ? '/admin' : `/#${label.toLowerCase()}`;
                  return (
                    <li key={label} onClick={closeMenu}>
                      <Link
                        href={href}
                        className="block text-gray-800 hover:text-blue-600 transition"
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>

        {/* Content */}
        {children}
      </body>
    </html>
  );
}

