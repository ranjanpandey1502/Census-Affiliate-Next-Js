import { Phone, Mail, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function Contact() {
  return (
    <section id="contact" className="pt-8 pb-24 bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mt-3">
              Contact Us
            </h2>
            <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
              Have questions about our affiliate program? Our team is ready to help.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal direction="up" delay={100}>
            <a
              href="tel:+971543632142"
              className="group flex flex-col items-center text-center bg-white hover:bg-accent/5 border border-border hover:border-accent/40 rounded-2xl p-10 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-primary font-bold text-lg mb-2">Phone Number</h3>
              <p className="text-muted-foreground group-hover:text-accent transition-colors text-base">
                +971 54 363 2142
              </p>
            </a>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <a
              href="mailto:info@census.travel"
              className="group flex flex-col items-center text-center bg-white hover:bg-accent/5 border border-border hover:border-accent/40 rounded-2xl p-10 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-primary font-bold text-lg mb-2">Email Address</h3>
              <p className="text-muted-foreground group-hover:text-accent transition-colors text-base">
                info@census.travel
              </p>
            </a>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <a
              href="https://maps.google.com/?q=Business+Village+Building+Deira+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center bg-white hover:bg-accent/5 border border-border hover:border-accent/40 rounded-2xl p-10 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-primary font-bold text-lg mb-2">Location</h3>
              <p className="text-muted-foreground group-hover:text-accent transition-colors text-base leading-relaxed">
                Office 923, 9th Floor, Block B,<br />
                Business Village Building,<br />
                Clock Tower Deira, Dubai, UAE
              </p>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
