'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOGO_WHITE = 'https://censustravel.com/wp-content/uploads/2025/09/Logo-white.png';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Benefits', id: 'benefits' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <img
              src={LOGO_WHITE}
              alt="Census Travel"
              className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 pl-[20px] pr-[20px] pt-[0px] pb-[0px]"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-white/90 hover:text-accent transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('register')}
              className="px-6 py-2.5 rounded-full font-semibold text-sm bg-accent text-primary hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Join Now
            </button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="text-white" size={24} />
            ) : (
              <Menu className="text-white" size={24} />
            )}
          </button>
        </div>
      </div>
      <div className={cn(
        'fixed inset-0 bg-primary z-40 transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6 md:hidden',
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Close menu"
        >
          <X className="text-white" size={20} />
        </button>
        <div className="mb-10">
          <img src={LOGO_WHITE} alt="Census Travel" className="h-10 w-auto object-contain" />
        </div>
        <nav className="flex flex-col gap-6 text-xl font-display text-white">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-left border-b border-white/10 pb-4 hover:text-accent transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('register')}
            className="mt-4 gold-gradient text-primary px-6 py-4 rounded-xl font-sans font-bold shadow-lg"
          >
            Join the Program
          </button>
        </nav>
      </div>
    </header>
  );
}
