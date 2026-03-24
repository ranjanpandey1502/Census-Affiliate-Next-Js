import { APP_PATHS } from '@/router/paths';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const LOGO_WHITE = 'https://censustravel.com/wp-content/uploads/2025/09/Logo-white.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Link href="/">
                <img src={LOGO_WHITE} alt="Census Travel" className="h-10 w-auto object-contain" />
              </Link>
            </div>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
              Curating luxury travel experiences worldwide while empowering our partners to build profitable travel businesses.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, url: "https://facebook.com/censustravel" },
                { Icon: Twitter, url: "https://twitter.com/censustravel" },
                { Icon: Instagram, url: "https://instagram.com/censustravel" },
                { Icon: Linkedin, url: "https://linkedin.com/company/censustravel" },
              ].map(({ Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-display">Program</h4>
            <ul className="space-y-4 text-white/60">
              <li><button onClick={() => document.getElementById('benefits')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-accent transition-colors">Benefits</button></li>
              <li><button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-accent transition-colors">How it Works</button></li>
              <li><button onClick={() => document.getElementById('testimonials')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-accent transition-colors">Success Stories</button></li>
              <li><Link href={APP_PATHS.signInPage} className="hover:text-accent transition-colors">Affiliate Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 font-display">Legal</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="https://censustravel.com/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-accent transition-colors">Cookie Policy</Link></li>
              <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-accent transition-colors">Contact Us</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} Census Travel. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Designed for <span className="text-accent">Census Travel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
