import { ScrollReveal } from './ScrollReveal';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Elena Rodriguez",
    role: "Luxury Travel Blogger",
    quote: "Partnering with Census Travel transformed my blog's monetization. Their premium inventory practically sells itself, and the commission structure is unmatched in the industry.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Marcus Chen",
    role: "Digital Nomad & Creator",
    quote: "The marketing assets provided by the team are stunning. I integrated their banners into my weekly newsletter and saw a 300% increase in my affiliate revenue within two months.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Sarah Jenkins",
    role: "Travel Agency Owner",
    quote: "As an independent agent, having Census Travel as a backend partner allows me to offer my VIP clients exclusive experiences while securing reliable, on-time payouts for my business.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#f8f5f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Partner Success</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Hear From Our Affiliates
            </h3>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150} direction="up">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/40 relative pt-12 h-full flex flex-col">
                <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="text-primary w-5 h-5 fill-current" />
                </div>
                
                <p className="text-muted-foreground italic leading-relaxed mb-8 flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-background"
                  />
                  <div>
                    <h5 className="font-bold text-primary">{testimonial.name}</h5>
                    <span className="text-sm text-accent font-medium">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14 sm:h-16 md:h-[70px] block">
          <path d="M0,55 C360,10 1080,70 1440,30 L1440,70 L0,70 Z" fill="#F3F4F6" />
        </svg>
      </div>
    </section>
  );
}
