"use client"
import { Navbar } from '@/components/landingPage/components/Navbar';
import { Hero } from '@/components/landingPage/components/Hero';
import { Benefits } from '@/components/landingPage/components/Benefits';
import { HowItWorks } from '@/components/landingPage/components/HowItWorks';
import { Testimonials } from '@/components/landingPage/components/Testimonials';
import { RegistrationForm } from '@/components/landingPage/components/RegistrationForm';
import { Contact } from '@/components/landingPage/components/Contact';
import { Footer } from '@/components/landingPage/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <RegistrationForm />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
