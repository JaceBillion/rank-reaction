import React from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-green-500/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="h-2 w-full bg-checkered-racing opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Trophy className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl font-display font-black italic tracking-tight">
              RANK <span className="text-green-500">REACTION</span>
            </h1>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-8">
          <div>
            <h2 className="text-4xl font-display font-black italic mb-2">Privacy Policy</h2>
            <p className="text-zinc-400 font-mono text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-6 text-zinc-300 leading-relaxed">
            <section>
              <h3 className="text-xl font-bold text-white mb-3">1. Introduction</h3>
              <p>
                Welcome to Rank Reaction ("we", "our", or "us"). We respect your privacy and are committed to protecting it. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website rankreaction.com.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-3">2. Information We Collect</h3>
              <p className="mb-2"><strong>Local Storage:</strong></p>
              <p>
                We use your browser's local storage to save your reaction time scores and history. This data is stored locally on your device 
                and is not transmitted to our servers. You can clear this data at any time by clearing your browser's cache and local storage.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-3">3. Google AdSense and DoubleClick Cookie</h3>
              <p className="mb-3">
                We use Google AdSense to display advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads on our site.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Google Ads Settings</a>.</li>
              </ul>
              <p className="mt-3">
                For more information on how Google uses data when you use our partners' sites or apps, please visit: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">How Google uses information from sites or apps that use our services</a>.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-3">4. Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites or services that are not owned or controlled by us. 
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-3">5. Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-3">6. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us through our website.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900 mt-auto">
        <div className="h-2 w-full bg-checkered-racing opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 font-mono text-sm">
          <div>&copy; {new Date().getFullYear()} Rank Reaction. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-zinc-300 transition-colors underline underline-offset-4">About</Link>
            <Link to="/contact" className="hover:text-zinc-300 transition-colors underline underline-offset-4">Contact</Link>
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors underline underline-offset-4">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
