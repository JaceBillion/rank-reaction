import React from 'react';
import { Trophy, ArrowLeft, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
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
            <h2 className="text-4xl font-display font-black italic mb-2">Contact Us</h2>
            <p className="text-zinc-400 font-mono text-sm">Get in touch with the Rank Reaction team</p>
          </div>

          <div className="space-y-6 text-zinc-300 leading-relaxed">
            <p className="text-lg">
              We'd love to hear from you! Whether you have feedback, feature requests, or business inquiries, the best way to reach us is through our official social media channels.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <a 
                href="https://instagram.com/RankReaction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-pink-500/50 hover:bg-zinc-800/80 transition-all group"
              >
                <Instagram className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-white">Instagram</div>
                  <div className="text-zinc-400 font-mono text-sm">@RankReaction</div>
                </div>
              </a>

              <a 
                href="https://twitter.com/RankReaction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-400/50 hover:bg-zinc-800/80 transition-all group"
              >
                <Twitter className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-white">X (Twitter)</div>
                  <div className="text-zinc-400 font-mono text-sm">@RankReaction</div>
                </div>
              </a>
            </div>
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
