import { Navbar } from '@/components/landingPage/components/Navbar';
import { Footer } from '@/components/landingPage/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <section className="pt-36 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: March 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">1. Introduction</h2>
              <p>Census Travel ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or register as an affiliate partner.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">2. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide when registering as an affiliate partner, including:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Country of residence</li>
                <li>Username and account credentials</li>
                <li>Marketing source information</li>
              </ul>
              <p className="mt-3">We also automatically collect certain technical data when you visit our site, such as IP address, browser type, pages visited, and time spent on pages.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Create and manage your affiliate account</li>
                <li>Process commission payments and track referrals</li>
                <li>Send program updates, newsletters, and promotional materials (with your consent)</li>
                <li>Improve our website and affiliate program</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">4. Sharing Your Information</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist in operating our website and affiliate program, subject to confidentiality agreements. We may also disclose information where required by law.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">5. Data Security</h2>
              <p>We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your personal information. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">6. Data Retention</h2>
              <p>We retain your personal data for as long as your affiliate account is active or as needed to provide you with services. You may request deletion of your data at any time by contacting us.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">7. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent to processing</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">8. Cookies</h2>
              <p>We use cookies and similar tracking technologies to enhance your experience. Please refer to our <a href="/cookie-policy" className="text-accent hover:underline">Cookie Policy</a> for full details.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or your personal data, please contact us:</p>
              <div className="mt-3 space-y-1">
                <p><strong className="text-primary">Email:</strong> info@census.travel</p>
                <p><strong className="text-primary">Phone:</strong> +971 54 363 2142</p>
                <p><strong className="text-primary">Address:</strong> Office 923, 9th Floor, Block B, Business Village Building, Clock Tower Deira, Dubai, UAE</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
