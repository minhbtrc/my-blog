import React from 'react';
import Link from 'next/link';
import { House, Search, AlignJustify } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/', icon: <House className="w-4 h-4" /> },
  { name: 'Search', href: '/search', icon: <Search className="w-4 h-4" /> },
  { name: 'More', href: '/more', icon: <AlignJustify className="w-4 h-4" /> },
];

const Navbar: React.FC = () => {
  return (
    <nav className="w-56 h-full p-4 shadow-lg fixed">
      <h1 className="text-2xl font-bold mb-8"></h1>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="flex items-center space-x-4 font-small text-sx hover:text-black transition">
              <span className="text-2xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
