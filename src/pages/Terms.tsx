import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Arena Market, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily access the materials (information or software) on Arena Market for personal, non-commercial transitory viewing only.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>This is the grant of a license, not a transfer of title</li>
              <li>You may not modify or copy the materials</li>
              <li>You may not use the materials for any commercial purpose</li>
              <li>You may not attempt to decompile or reverse engineer any software</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Account Responsibilities</h2>
            <p>When you create an account with us, you guarantee that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are at least 18 years of age</li>
              <li>The information you provide is accurate and complete</li>
              <li>You will maintain the security of your password and account</li>
              <li>You will notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Seller Obligations</h2>
            <p>If you are selling on Arena Market, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate product descriptions and images</li>
              <li>Honor all sales and deliver products as described</li>
              <li>Maintain adequate stock levels</li>
              <li>Respond to customer inquiries promptly</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Buyer Obligations</h2>
            <p>As a buyer, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate delivery information</li>
              <li>Complete payment for orders placed</li>
              <li>Accept delivery of ordered items</li>
              <li>Report any issues with orders within 7 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Prohibited Activities</h2>
            <p>You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>List counterfeit, illegal, or prohibited items</li>
              <li>Manipulate prices or engage in fraudulent activities</li>
              <li>Interfere with other users' transactions</li>
              <li>Use automated systems to access the platform</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Payment Processing</h2>
            <p>All payments are processed through secure third-party payment processors. Arena Market does not store your complete payment information. By making a purchase, you agree to the payment processor's terms of service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Commission and Fees</h2>
            <p>Arena Market charges a 10% commission on all sales. This commission is automatically calculated and deducted from the seller's payout.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p>Arena Market shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Modifications to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us through our support channels.</p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
