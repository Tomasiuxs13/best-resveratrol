import React from 'react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Medical Disclaimer</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: January 30, 2025</p>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
        <p className="text-red-800 font-bold text-lg mb-2">⚠️ Important Health Notice</p>
        <p className="text-red-700">
          The information provided on Best Resveratrol is for educational and informational purposes only. It is NOT intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or supplement use.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Medical Advice</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>We are not medical professionals.</strong> The content on this website, including articles, product reviews, and recommendations, does not constitute medical, health, or nutritional advice.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            All information is provided for general educational purposes. You should not rely on this information as a substitute for, nor does it replace, professional medical advice, diagnosis, or treatment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Consult Your Healthcare Provider</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Before taking any dietary supplement, including resveratrol, you MUST consult with your healthcare provider,</strong> especially if you:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Have any pre-existing medical conditions</li>
            <li>Are pregnant or breastfeeding</li>
            <li>Are taking prescription medications</li>
            <li>Are taking blood thinners or anticoagulants</li>
            <li>Have upcoming surgery scheduled</li>
            <li>Have hormone-sensitive conditions</li>
            <li>Have bleeding disorders</li>
            <li>Are under 18 years of age</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information Accuracy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            While we strive to provide accurate and up-to-date product information:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Product formulations may change without notice</li>
            <li>Manufacturers may update ingredients, dosages, or warnings</li>
            <li>We are not responsible for product manufacturing or labeling</li>
            <li>Always read product labels and follow manufacturer instructions</li>
            <li>Verify current product information before purchase</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Guaranteed Results</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Individual results may vary.</strong> The benefits and effects of resveratrol supplements mentioned on this website are based on:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Published scientific research</li>
            <li>Product manufacturer claims</li>
            <li>General user experiences</li>
            <li>Our analysis and opinions</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We do not guarantee any specific health benefits, weight loss, disease prevention, or other outcomes from using any products reviewed on this website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">FDA Statements</h2>
          <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg mb-4">
            <p className="text-gray-800 italic">
              "These statements have not been evaluated by the Food and Drug Administration. The products mentioned on this website are not intended to diagnose, treat, cure, or prevent any disease."
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Dietary supplements are not regulated by the FDA in the same way as pharmaceutical drugs. The safety and efficacy of supplements may not be fully established.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Potential Side Effects and Interactions</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Resveratrol and other supplements may cause side effects or interact with medications. Known considerations include:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Blood Thinning:</strong> May increase bleeding risk when combined with anticoagulants</li>
            <li><strong>Surgery:</strong> Should be discontinued 2 weeks before scheduled surgeries</li>
            <li><strong>Medications:</strong> May interact with various prescription drugs</li>
            <li><strong>Allergic Reactions:</strong> Some individuals may be allergic to ingredients</li>
            <li><strong>Digestive Issues:</strong> May cause stomach upset in some users</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            This is not an exhaustive list. Discuss all potential risks with your healthcare provider.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Products</h2>
          <p className="text-gray-700 leading-relaxed">
            Products reviewed on this website are manufactured by third parties. We are not responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Product quality, safety, or efficacy</li>
            <li>Manufacturing processes or quality control</li>
            <li>Ingredient sourcing or purity</li>
            <li>Adverse reactions or side effects</li>
            <li>Product recalls or safety warnings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Research and Scientific Studies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reference scientific studies and research when discussing resveratrol benefits. Please note:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Most resveratrol research is conducted on animals, not humans</li>
            <li>Lab studies may not translate to real-world human results</li>
            <li>Long-term human safety data is limited</li>
            <li>Optimal dosing for humans is not definitively established</li>
            <li>Research is ongoing and conclusions may change</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Medical Situations</h2>
          <div className="bg-red-50 border-l-4 border-red-500 p-6">
            <p className="text-red-800 font-semibold mb-2">⚠️ Medical Emergencies</p>
            <p className="text-red-700">
              If you experience a medical emergency, call 911 or your local emergency number immediately. Do not rely on information from this website for emergency medical treatment.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            By using this website, you acknowledge and agree that Best Resveratrol, its owners, authors, and contributors shall not be held liable for any damages, injuries, or adverse effects arising from:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Use or misuse of information on this website</li>
            <li>Use of products purchased based on our recommendations</li>
            <li>Reliance on product reviews or rankings</li>
            <li>Failure to consult with healthcare professionals</li>
            <li>Interactions between supplements and medications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates and Changes</h2>
          <p className="text-gray-700 leading-relaxed">
            This disclaimer may be updated periodically. Continued use of this website after changes constitutes acceptance of the updated disclaimer. Check this page regularly for updates.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about this disclaimer:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700"><strong>Email:</strong> legal@bestresveratrol.com</p>
            <p className="text-gray-700"><strong>Website:</strong> <a href="https://bestresveratrol.com" className="text-blue-600 hover:underline">https://bestresveratrol.com</a></p>
          </div>
        </section>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
          <p className="text-blue-800 font-semibold mb-2">💡 Remember</p>
          <p className="text-blue-700">
            Your health and safety are paramount. Always prioritize professional medical advice over any information found online. When in doubt, consult your doctor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
