import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Return & Refund Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Return Eligibility</h2>
            <p>You may return items within 7 days of delivery if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The item is defective or damaged</li>
              <li>You received the wrong item</li>
              <li>The item significantly differs from its description</li>
              <li>The item is unused and in original packaging (for non-defective returns)</li>
            </ul>
            <p className="mt-3"><strong>Non-returnable items:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Perishable goods (food, flowers, etc.)</li>
              <li>Personal care items</li>
              <li>Intimate or sanitary goods</li>
              <li>Customized or personalized items</li>
              <li>Items marked as "Final Sale" or "Non-returnable"</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Go to your Orders page and select the order you wish to return</li>
              <li>Click "Request Return" and select the reason</li>
              <li>Provide photos if the item is damaged or incorrect</li>
              <li>Wait for seller approval (typically within 2-3 business days)</li>
              <li>Once approved, follow the return shipping instructions</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Return Shipping</h2>
            <p><strong>Who pays for return shipping:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Defective/Wrong Items:</strong> Seller covers return shipping costs</li>
              <li><strong>Change of Mind:</strong> Buyer covers return shipping costs</li>
            </ul>
            <p className="mt-3">Pack items securely in original packaging if possible. Include all accessories, manuals, and documentation. Use a trackable shipping method.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Refund Process</h2>
            <p><strong>Timeline:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Seller inspects returned item: 2-3 business days after receipt</li>
              <li>Refund approval: Within 1 business day of inspection</li>
              <li>Refund processing: 5-10 business days depending on payment method</li>
            </ul>
            <p className="mt-3"><strong>Refund Method:</strong></p>
            <p>Refunds are issued to the original payment method. If the original payment method is unavailable, we may issue store credit.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Partial Refunds</h2>
            <p>In some cases, partial refunds may be granted:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items returned after 7 days (at seller's discretion)</li>
              <li>Items not in original condition or missing parts</li>
              <li>Items with obvious signs of use</li>
              <li>Damaged returns due to inadequate packaging</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Exchanges</h2>
            <p>We do not offer direct exchanges. If you need a different size, color, or variant:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Return the original item for a refund</li>
              <li>Place a new order for the desired item</li>
            </ol>
            <p className="mt-3">This ensures faster processing and better stock availability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Damaged or Defective Items</h2>
            <p>If you receive a damaged or defective item:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Document the damage with clear photos</li>
              <li>Report the issue within 48 hours of delivery</li>
              <li>Do not discard packaging or accessories</li>
              <li>Follow the return process outlined above</li>
            </ol>
            <p className="mt-3">For significantly damaged items, we may arrange for pickup at our expense.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Lost or Missing Items</h2>
            <p>If your order doesn't arrive:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Check tracking information for delivery status</li>
              <li>Contact the seller if delivery is delayed beyond expected date</li>
              <li>If item is confirmed lost, we will issue a full refund or reship</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Seller Responsibilities</h2>
            <p>Sellers must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to return requests within 2 business days</li>
              <li>Provide clear return instructions</li>
              <li>Inspect returned items promptly</li>
              <li>Process refunds within 1 business day of approval</li>
              <li>Honor the return policy terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Disputes</h2>
            <p>If you have a dispute about a return or refund:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Try to resolve the issue directly with the seller</li>
              <li>If unresolved, contact Arena Market support with order details</li>
              <li>Provide all relevant documentation (photos, communication, etc.)</li>
              <li>Arena Market will mediate and make a final determination</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Cancellations</h2>
            <p><strong>Before Shipping:</strong> Orders can be cancelled for a full refund if the seller hasn't shipped yet.</p>
            <p className="mt-2"><strong>After Shipping:</strong> Follow the return process above once you receive the item.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Contact Support</h2>
            <p>For questions about returns or refunds, contact us through:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your Orders page</li>
              <li>Customer support channels</li>
              <li>Seller messaging system</li>
            </ul>
          </section>

          <p className="text-sm text-muted-foreground mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
