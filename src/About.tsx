import React from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
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
            <h2 className="text-4xl font-display font-black italic mb-2">About Rank Reaction</h2>
          </div>

          <div className="space-y-8 text-zinc-300 leading-relaxed">
            <section>
              <h3 className="text-2xl font-display font-bold italic text-white mb-3">The Science of the Start</h3>
              <p>
                At Rank Reaction, we believe that precision isn't just a metric—it's a competitive edge. Whether you are a professional eSports athlete waiting for a pixel to change or a sprinter waiting for the crack of the starter's pistol, those few milliseconds determine the difference between the podium and the pack.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-display font-bold italic text-white mb-3">Our Mission</h3>
              <p>
                Rank Reaction was founded to provide a high-precision, zero-latency benchmarking tool for the digital age. Most "click tests" are bogged down by heavy code and background scripts that add "fake" delay to your score. We built this engine to be as lightweight as a carbon-fiber spike, ensuring that the time you see on the screen is a true reflection of your neural processing speed.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-display font-bold italic text-white mb-3">From the Track to the Screen</h3>
              <p>
                The inspiration for Rank Reaction comes from the world of Track and Field. In the 400-meter dash, the "explosive start" is everything. We've taken the discipline of the starting blocks and applied it to the browser. Our unique Tier System—ranging from "Human Average" to the elusive "Cybernetic"—is designed to push you to train your brain just like an athlete trains their body.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-display font-bold italic text-white mb-3">How it Works</h3>
              <p>
                We use high-resolution timestamps (<code>performance.now()</code>) to measure the exact moment of your click against the server's "Go" signal. We don't just give you a number; we give you a Rank so you can see where you stand in the global hierarchy of human reflexes.
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
