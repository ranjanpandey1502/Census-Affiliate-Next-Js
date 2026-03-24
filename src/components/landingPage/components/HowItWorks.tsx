import { ScrollReveal } from './ScrollReveal';
import { UserPlus, Share2, DollarSign } from 'lucide-react';

const steps = [
  {
    title: "1. Register",
    description: "Complete our simple application form below. It takes less than 2 minutes and is completely free to join.",
    icon: UserPlus,
  },
  {
    title: "2. Share",
    description: "Get your unique tracking links and start promoting Census Travel across your blog, social media, or email list.",
    icon: Share2,
  },
  {
    title: "3. Earn",
    description: "Receive lucrative commissions for every successful booking referred through your links.",
    icon: DollarSign,
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-primary text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">The Process</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Start Earning in Three Simple Steps
            </h3>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-white/20" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={index} delay={index * 150} direction="up" className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary border-4 border-white/10 flex items-center justify-center mb-8 relative group hover:border-accent transition-colors duration-300">
                    <div className="absolute inset-2 rounded-full bg-white/5 group-hover:bg-accent/20 transition-colors" />
                    <Icon className="w-10 h-10 text-accent relative z-10" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 font-display">{step.title}</h4>
                  <p className="text-white/70 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <ScrollReveal delay={400}>
            <button 
              onClick={() => {
                document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-accent text-primary rounded-full font-bold text-lg hover:bg-white transition-colors duration-300 shadow-xl shadow-black/20"
            >
              Apply Now
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
