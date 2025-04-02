import React from 'react';
import Link from 'next/link';
import { House, AlignJustify, Github, Mails } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/', icon: <House className="w-4 h-4" /> },
  { name: 'Blog', href: '/blog', icon: <AlignJustify className="w-4 h-4" /> },
  { name: 'Contact', href: '/contact', icon: <Mails className="w-4 h-4" /> },
  { name: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL , icon: <Github className="w-4 h-4" />, external: true },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <motion.nav 
      className="w-56 h-full p-6 fixed bg-white dark:bg-background border-r border-emerald-100 dark:border-border"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/" className="block mb-10">
        <motion.div
          className="text-xl font-medium text-emerald-700 dark:text-white"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Minh B.
        </motion.div>
      </Link>
      
      <ul className="space-y-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <li key={item.name}>
              <Link 
                href={item.href}
                target={item.external ? "_blank" : undefined} 
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`group flex items-center space-x-3 py-2 px-3 rounded-md transition-all ${
                  isActive 
                    ? 'bg-emerald-50 dark:bg-primary/10 text-emerald-700 dark:text-primary' 
                    : 'text-gray-600 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted/20'
                }`}
              >
                <motion.span 
                  className={`${isActive ? 'text-emerald-600 dark:text-primary' : 'text-gray-500 dark:text-muted-foreground'}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                </motion.span>
                <span className="text-sm font-medium">{item.name}</span>
                
                {isActive && (
                  <motion.div 
                    className="absolute left-0 w-1 h-8 bg-emerald-500 dark:bg-primary rounded-r-full"
                    layoutId="activeNavIndicator"
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30 
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
