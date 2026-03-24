import { ArrowRight, Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function Hero() {
  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" 
          alt="Dubai Skyline" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-32">
        <div className="max-w-3xl">
          <ScrollReveal direction="up" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent mb-6">
              <Star size={14} className="fill-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Premium Affiliate Program</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <h1
              className="font-sans mb-6 tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] text-[#ffffff]"
              style={{ fontSize: 'clamp(42px, 5.5vw, 65px)', fontWeight: 900, lineHeight: 1.0, fontFamily: "'Barlow', sans-serif" }}
            >
              Turn your<br />
              Travel Network into<br />
              <span className="text-accent">Travel Earnings</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mb-10 leading-relaxed">
              Join the Census Travel partner network. Earn generous commissions by sharing curated luxury experiences and unforgettable destinations with your audience.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToRegister}
                className="group relative px-8 py-4 bg-accent text-primary rounded-full font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(212,168,83,0.3)] hover:shadow-[0_0_60px_rgba(212,168,83,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Start Earning Today
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
      {/* Ocean wave transition */}
      <div className="absolute bottom-0 inset-x-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-20 md:h-24 block">
          <path d="M0,70 C240,90 480,50 720,70 C960,90 1200,55 1440,70 L1440,90 L0,90 Z" fill="hsl(40,50%,97%)" />
        </svg>
      </div>
    </section>
  );
}
