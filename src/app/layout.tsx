'use client';
import './globals.css';
import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans leading-relaxed">
        {/* Navbar */}
        <nav className="bg-transparent sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
              MyDevBlog
            </h1>

            {/* Desktop menu */}
            <ul className="hidden md:flex gap-8 text-base sm:text-lg font-medium text-gray-800">
              {['Home', 'Dashboard', 'About', 'Contact'].map((label) => {
                const href =
                  label === 'Home'
                    ? '/'
                    : label === 'Dashboard'
                    ? '/admin'
                    : `/#${label.toLowerCase()}`;
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

            {/* Hamburger icon */}
            <div className="md:hidden">
              <button
                className="flex flex-col gap-1 focus:outline-none"
                onClick={toggleMenu}
              >
                <span className="w-6 h-0.5 bg-gray-800"></span>
                <span className="w-6 h-0.5 bg-gray-800"></span>
                <span className="w-6 h-0.5 bg-gray-800"></span>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden px-6 pb-4">
              <ul className="flex flex-col gap-4 text-gray-800 font-medium text-base">
                {['Home', 'Dashboard', 'About', 'Contact'].map((label) => {
                  const href =
                    label === 'Home'
                      ? '/'
                      : label === 'Dashboard'
                      ? '/admin'
                      : `/#${label.toLowerCase()}`;
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className="block hover:text-blue-600 transition"
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
