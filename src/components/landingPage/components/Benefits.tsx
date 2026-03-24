import { ScrollReveal } from './ScrollReveal';
import { Wallet, Megaphone, LineChart, CalendarCheck } from 'lucide-react';

const benefits = [
  {
    title: "Generous Commissions",
    description: "Earn up to 15% commission on every completed luxury booking made through your unique referral link.",
    icon: Wallet,
  },
  {
    title: "Marketing Support",
    description: "Access a library of high-converting, professionally designed banners, social media assets, and email templates.",
    icon: Megaphone,
  },
  {
    title: "Real-Time Tracking",
    description: "Monitor your clicks, conversions, and earnings instantly through our state-of-the-art affiliate dashboard.",
    icon: LineChart,
  },
  {
    title: "Monthly Payouts",
    description: "Enjoy reliable, on-time payments every single month with multiple withdrawal options globally.",
    icon: CalendarCheck,
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <img src={`/images/decorative-pattern.png`} alt="pattern" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Why Join Us</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              The Premium Standard in Travel Partnerships
            </h3>
            <p className="text-lg text-muted-foreground">
              We provide our partners with industry-leading tools, exceptional support, and lucrative compensation. Your success is our priority.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal key={index} delay={index * 100} direction="up">
                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 border border-border/50 hover:shadow-xl hover:border-accent/30 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col group">
                  <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/10 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3 font-display">{benefit.title}</h4>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
