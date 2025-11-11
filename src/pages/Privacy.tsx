import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2">Personal Information</h3>
            <p>When you register or use Arena Market, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Delivery addresses</li>
              <li>Payment information (processed securely by third parties)</li>
              <li>Transaction history and order details</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser information</li>
              <li>Device information and operating system</li>
              <li>Pages visited and actions taken on the platform</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate about your transactions and account</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our platform and user experience</li>
              <li>Prevent fraud and enhance security</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
            <p>We share your information only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With Sellers:</strong> Order and delivery information necessary to fulfill your purchase</li>
              <li><strong>With Buyers:</strong> Sellers receive buyer contact information for order fulfillment</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist in operations (payment processors, delivery services)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with merger, sale, or acquisition</li>
            </ul>
            <p className="mt-3">We never sell your personal information to third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal information</li>
            </ul>
            <p className="mt-3">However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Maintain your shopping cart</li>
              <li>Analyze platform usage and performance</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="mt-3">You can control cookies through your browser settings, but some features may not function properly without them.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
            <p>Arena Market is not intended for users under 18 years of age. We do not knowingly collect information from children. If we discover we have collected information from a child, we will delete it immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Data Retention</h2>
            <p>We retain your information for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p className="mt-3">Transaction records are retained for 7 years for tax and accounting purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of significant changes by email or through a prominent notice on the platform. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
            <p>For questions or concerns about this privacy policy or our data practices, please contact us through our support channels.</p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
