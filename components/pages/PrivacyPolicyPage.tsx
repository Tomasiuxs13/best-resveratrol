import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: January 30, 2025</p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Best Resveratrol ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://bestresveratrol.com" className="text-blue-600 hover:underline">https://bestresveratrol.com</a>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our website, you consent to the data practices described in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Device identifiers</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookies and Tracking Technologies</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve and personalize your experience</li>
            <li>Analyze usage patterns and trends</li>
            <li>Monitor and prevent technical issues</li>
            <li>Comply with legal obligations</li>
            <li>Track affiliate conversions and commissions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our website may contain links to third-party websites and services, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Amazon Associates:</strong> We participate in the Amazon Services LLC Associates Program, an affiliate advertising program. Amazon may collect information when you click our affiliate links.</li>
            <li><strong>Analytics Services:</strong> We may use Google Analytics or similar services to analyze website traffic. These services use cookies to collect anonymous usage data.</li>
            <li><strong>Product Vendors:</strong> When you click affiliate links to purchase products, you will be redirected to third-party retailers who have their own privacy policies.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Access:</strong> Request access to your personal data</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Deletion:</strong> Request deletion of your data</li>
            <li><strong>Opt-Out:</strong> Opt out of certain data collection practices</li>
            <li><strong>Cookie Control:</strong> Manage cookie preferences through your browser</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the website after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700"><strong>Email:</strong> privacy@bestresveratrol.com</p>
            <p className="text-gray-700"><strong>Website:</strong> <a href="https://bestresveratrol.com" className="text-blue-600 hover:underline">https://bestresveratrol.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
