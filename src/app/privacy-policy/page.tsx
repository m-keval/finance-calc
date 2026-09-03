import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CalcNiv",
  description: "Privacy policy and terms of service for CalcNiv's financial calculators.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. No Personal Information Collection</h2>
          <p>
            At CalcNiv, your privacy is our absolute priority. We are strictly a tool-based website designed to provide you with fast and accurate financial calculators. 
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><strong>No Logins or Accounts:</strong> We do not have a user registration system. You never have to create an account, log in, or provide an email address to use our tools.</li>
            <li><strong>No Financial Data Stored:</strong> All of our financial calculators run entirely client-side (in your browser). The numbers, financial data, and scenarios you enter are <strong>never</strong> transmitted to our servers or stored in any database. The calculations happen locally on your device.</li>
            <li><strong>No Personal Data:</strong> We do not ask for, collect, or process personally identifiable information (PII) such as names, phone numbers, or addresses.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Google AdSense & Advertising</h2>
          <p>
            We use Google AdSense to display ads on some of our pages to support the free tools we provide.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Cookies</h2>
          <p>
            A cookie is a small file containing a string of characters that is sent to your computer when you visit a website. 
            When you visit the site again, the cookie allows that site to recognize your browser. 
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Essential Cookies:</strong> To remember your consent choices regarding cookies.</li>
            <li><strong>Analytics Cookies:</strong> To understand how visitors interact with our website (e.g., Google Analytics).</li>
            <li><strong>Advertising Cookies:</strong> Used by Google AdSense to deliver relevant advertisements.</li>
          </ul>
          <p className="mt-2">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Log Data & Analytics</h2>
          <p>
            While we do not collect personal information, we may collect standard non-personally identifiable information that your browser sends whenever you visit our site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, and the time spent on those pages. We use this data solely to monitor and analyze the use of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Third-Party Links</h2>
          <p>
            Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over, and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Children's Privacy</h2>
          <p>
            Our website and tools are not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Security</h2>
          <p>
            The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, 
            or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, 
            we cannot guarantee its absolute security. Since our tools process data locally, the risk regarding financial data is minimal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Site. 
            You are advised to review this Privacy Policy periodically for any changes.
          </p>
          <p className="mt-2">
            <em>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</em>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@calcniv.in.
          </p>
        </section>
      </div>
    </div>
  );
}
