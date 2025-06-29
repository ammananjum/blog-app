'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/admin' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans leading-relaxed">
        {/* Navbar */}
        <nav className="bg-transparent sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
              MyDevBlog
            </h1>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-8 text-base sm:text-lg font-medium text-gray-800">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="relative hover:text-blue-600 transition-all duration-300 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Toggle */}
            <div className="md:hidden text-2xl">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <ul className="md:hidden px-6 pb-4 space-y-2 bg-white text-base font-medium text-gray-800 shadow-md">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 border-b hover:text-blue-600"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Content */}
        {children}
      </body>
    </html>
  );
}
