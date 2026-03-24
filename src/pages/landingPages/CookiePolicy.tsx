import { Navbar } from '@/components/landingPage/components/Navbar';
import { Footer } from '@/components/landingPage/components/Footer';

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-background flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <section className="pt-36 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: March 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">1. What Are Cookies</h2>
              <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to website owners about how their site is being used.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">2. How We Use Cookies</h2>
              <p>Census Travel uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-primary">Essential Cookies:</strong> Required for the website to function properly, including maintaining your session and enabling secure login.</li>
                <li><strong className="text-primary">Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting anonymous information.</li>
                <li><strong className="text-primary">Functional Cookies:</strong> Remember your preferences and settings to enhance your experience.</li>
                <li><strong className="text-primary">Affiliate Tracking Cookies:</strong> Track referral links and attribute commissions correctly to our affiliate partners.</li>
                <li><strong className="text-primary">Marketing Cookies:</strong> Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">3. Types of Cookies We Use</h2>
              <div className="overflow-x-auto mt-3">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary/5">
                      <th className="text-left p-3 font-semibold text-primary border border-border">Cookie Name</th>
                      <th className="text-left p-3 font-semibold text-primary border border-border">Type</th>
                      <th className="text-left p-3 font-semibold text-primary border border-border">Purpose</th>
                      <th className="text-left p-3 font-semibold text-primary border border-border">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-border">session_id</td>
                      <td className="p-3 border border-border">Essential</td>
                      <td className="p-3 border border-border">Maintains user session</td>
                      <td className="p-3 border border-border">Session</td>
                    </tr>
                    <tr className="bg-primary/5">
                      <td className="p-3 border border-border">_ga</td>
                      <td className="p-3 border border-border">Performance</td>
                      <td className="p-3 border border-border">Google Analytics tracking</td>
                      <td className="p-3 border border-border">2 years</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-border">ref_code</td>
                      <td className="p-3 border border-border">Affiliate</td>
                      <td className="p-3 border border-border">Tracks affiliate referral source</td>
                      <td className="p-3 border border-border">30 days</td>
                    </tr>
                    <tr className="bg-primary/5">
                      <td className="p-3 border border-border">preferences</td>
                      <td className="p-3 border border-border">Functional</td>
                      <td className="p-3 border border-border">Stores user preferences</td>
                      <td className="p-3 border border-border">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">4. Third-Party Cookies</h2>
              <p>We may use third-party services such as Google Analytics, Facebook Pixel, and payment processors that set their own cookies. These third parties have their own privacy policies governing how they use such information. We do not control these cookies.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">5. Managing Cookies</h2>
              <p>You can control and manage cookies in several ways:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-primary">Browser settings:</strong> Most browsers allow you to block or delete cookies through their settings. Note that disabling essential cookies may affect website functionality.</li>
                <li><strong className="text-primary">Opt-out tools:</strong> For analytics cookies, you can use the Google Analytics Opt-out Browser Add-on.</li>
                <li><strong className="text-primary">Cookie consent:</strong> You can adjust your preferences at any time by contacting us.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">6. Changes to This Policy</h2>
              <p>We may update this Cookie Policy from time to time to reflect changes in technology or legislation. We will notify you of significant changes by posting the new policy on this page with an updated date.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">7. Contact Us</h2>
              <p>If you have questions about our use of cookies, please contact us:</p>
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
