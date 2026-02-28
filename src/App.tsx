import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Trophy, Activity, Zap, Brain, Monitor, AlertTriangle, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

type GameState = 'idle' | 'waiting' | 'go' | 'result' | 'falseStart';

interface Score {
  time: number;
  rank: string;
  date: string;
}

function getRank(time: number) {
  if (time < 150) return "Cybernetic 🤖";
  if (time < 190) return "Apex Predator 🐆";
  if (time < 230) return "Elite Gamer 🎮";
  if (time < 270) return "Sharp Civilian ⚡";
  if (time < 320) return "Human Average 🚶";
  if (time < 450) return "The Daydreamer ☁️";
  return "Dial-Up Speed 📞";
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [history, setHistory] = useState<Score[]>([]);
  const [copied, setCopied] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('rankReactionHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveScore = (time: number) => {
    const newScore: Score = {
      time,
      rank: getRank(time),
      date: new Date().toISOString()
    };
    setHistory(prev => {
      const newHistory = [newScore, ...prev].slice(0, 5);
      localStorage.setItem('rankReactionHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleStart = useCallback(() => {
    setGameState('waiting');
    setReactionTime(null);
    
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2 to 5 seconds
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setGameState('go');
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleInteraction = useCallback((e?: React.MouseEvent | React.TouchEvent | KeyboardEvent) => {
    if (e && e.type === 'keydown') {
      e.preventDefault();
    }
    
    if (gameState === 'idle' || gameState === 'result' || gameState === 'falseStart') {
      handleStart();
    } else if (gameState === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('falseStart');
    } else if (gameState === 'go') {
      const endTime = performance.now();
      const time = Math.round(endTime - startTimeRef.current);
      setReactionTime(time);
      setGameState('result');
      saveScore(time);
    }
  }, [gameState, handleStart]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if (e.repeat) return;
        handleInteraction(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  const shareScore = async () => {
    if (!reactionTime) return;
    const rank = getRank(reactionTime);
    const shareText = `🏁 Just clocked ${reactionTime}ms on RankReaction.com! \nRank: ${rank} \nCan you beat my time? #RankReaction`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy score to clipboard.');
    }
  };

  const getTestAreaClasses = () => {
    switch (gameState) {
      case 'idle': return 'bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer border-2 border-zinc-700';
      case 'waiting': return 'bg-red-600 text-white cursor-pointer border-2 border-red-500';
      case 'go': return 'bg-green-500 text-white cursor-pointer border-2 border-green-400';
      case 'result': return 'bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer border-2 border-zinc-700';
      case 'falseStart': return 'bg-blue-600 text-white cursor-pointer border-2 border-blue-500';
      default: return 'bg-zinc-800 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-green-500/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="h-2 w-full bg-checkered-racing opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl font-display font-black italic tracking-tight">
              RANK <span className="text-green-500">REACTION</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 justify-center">
        
        {/* Left Ad */}
        <aside className="hidden lg:flex flex-col items-center justify-start w-[160px] shrink-0">
          <div className="w-[160px] h-[600px] bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 font-mono text-sm text-center p-4 sticky top-24">
            Advertisement<br/>(160x600)
          </div>
        </aside>

        {/* Center Content */}
        <div className="flex-1 max-w-3xl w-full mx-auto space-y-12">
          
          {/* Test Area */}
          <section>
            <div 
              onMouseDown={handleInteraction}
              onTouchStart={handleInteraction}
              className={`w-full h-[400px] rounded-2xl flex flex-col items-center justify-center transition-colors duration-75 select-none shadow-2xl overflow-hidden relative ${getTestAreaClasses()}`}
            >
              {gameState === 'idle' && (
                <>
                  <div className="absolute top-0 left-0 w-full h-6 bg-checkered-racing opacity-10"></div>
                  <div className="absolute bottom-0 left-0 w-full h-6 bg-checkered-racing opacity-10"></div>
                  <Zap className="w-16 h-16 mb-4 text-zinc-400" />
                  <h2 className="text-4xl font-display font-bold italic mb-2">Click to Start</h2>
                  <p className="text-zinc-400 font-mono">Wait for the green screen</p>
                </>
              )}
              {gameState === 'waiting' && (
                <>
                  <h2 className="text-5xl font-display font-bold italic mb-2">Wait for Green...</h2>
                  <p className="text-red-200 font-mono text-lg">Do not click yet</p>
                </>
              )}
              {gameState === 'go' && (
                <>
                  <h2 className="text-7xl font-display font-black italic mb-2 tracking-widest">CLICK!</h2>
                </>
              )}
              {gameState === 'result' && reactionTime && (
                <>
                  <Timer className="w-12 h-12 mb-4 text-green-500" />
                  <h2 className="text-6xl font-mono font-bold mb-2">{reactionTime} ms</h2>
                  <p className="text-3xl font-display font-bold italic text-green-400 mb-8">{getRank(reactionTime)}</p>
                  <p className="text-zinc-400 font-mono mb-6">Click to try again</p>
                  <button 
                    id="copy-btn"
                    onMouseDown={(e) => { e.stopPropagation(); shareScore(); }}
                    onTouchStart={(e) => { e.stopPropagation(); shareScore(); }}
                    className="mt-[15px] px-[20px] py-[10px] cursor-pointer bg-[#333] text-white border border-green-500 font-bold z-10 hover:bg-[#444] transition-colors"
                  >
                    {copied ? "COPIED! ✅" : "COPY RESULT 🏁"}
                  </button>
                </>
              )}
              {gameState === 'falseStart' && (
                <>
                  <AlertTriangle className="w-16 h-16 mb-4 text-blue-200" />
                  <h2 className="text-5xl font-display font-bold italic mb-2">False Start!</h2>
                  <p className="text-blue-200 font-mono text-lg">You clicked too early.</p>
                  <p className="text-blue-200/70 font-mono mt-8">Click to try again</p>
                </>
              )}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-green-500" />
              <h3 className="text-xl font-display font-bold italic">Recent Activity</h3>
            </div>
            
            {history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-sm">
                      <th className="pb-3 font-medium">Time</th>
                      <th className="pb-3 font-medium">Rank</th>
                      <th className="pb-3 font-medium text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((score, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 last:border-0">
                        <td className="py-4 font-mono font-bold text-lg">{score.time} ms</td>
                        <td className="py-4 font-display italic font-semibold text-zinc-300">{score.rank}</td>
                        <td className="py-4 text-right text-zinc-500 font-mono text-sm">
                          {new Date(score.date).toLocaleDateString()} {new Date(score.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-500 font-mono">
                No scores yet. Take the test to see your history!
              </div>
            )}
          </section>

          {/* Rank Tiers */}
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-green-500" />
              <h3 className="text-xl font-display font-bold italic">Rank Tiers</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
                <span className="font-display italic font-bold text-purple-400">Cybernetic 🤖</span>
                <span className="font-mono text-sm text-zinc-400">&lt; 150 ms</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
                <span className="font-display italic font-bold text-red-400">Apex Predator 🐆</span>
                <span className="font-mono text-sm text-zinc-400">150 - 189 ms</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
                <span className="font-display italic font-bold text-orange-400">Elite Gamer 🎮</span>
                <span className="font-mono text-sm text-zinc-400">190 - 229 ms</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
                <span className="font-display italic font-bold text-yellow-400">Sharp Civilian ⚡</span>
                <span className="font-mono text-sm text-zinc-400">230 - 269 ms</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
                <span className="font-display italic font-bold text-green-400">Human Average 🚶</span>
                <span className="font-mono text-sm text-zinc-400">270 - 319 ms</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center">
                <span className="font-display italic font-bold text-blue-400">The Daydreamer ☁️</span>
                <span className="font-mono text-sm text-zinc-400">320 - 449 ms</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center sm:col-span-2 lg:col-span-3">
                <span className="font-display italic font-bold text-zinc-400">Dial-Up Speed 📞</span>
                <span className="font-mono text-sm text-zinc-400">450+ ms</span>
              </div>
            </div>
          </section>

          {/* How to Improve */}
          <section className="space-y-6">
            <h3 className="text-2xl font-display font-bold italic border-b border-zinc-800 pb-4">
              How to Improve Your Score
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <Monitor className="w-6 h-6 text-green-500 mb-3" />
                <h4 className="font-bold mb-2">Hardware Setup</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Use a high refresh rate monitor (144Hz+) and a wired gaming mouse to minimize input lag and display latency.
                </p>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <Activity className="w-6 h-6 text-green-500 mb-3" />
                <h4 className="font-bold mb-2">Physical Health</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Reaction times peak when you are well-rested and hydrated. Lack of sleep can add 50ms+ to your reaction time.
                </p>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <Brain className="w-6 h-6 text-green-500 mb-3" />
                <h4 className="font-bold mb-2">Cognitive Drills</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Regular practice builds neural pathways. Warm up with aim trainers or rhythm games before competitive matches.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Banner Ad */}
          <div className="w-full flex justify-center py-4">
            <div className="w-full max-w-[728px] h-[90px] bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 font-mono text-sm text-center">
              Advertisement (728x90)
            </div>
          </div>

        </div>

        {/* Right Ad */}
        <aside className="hidden lg:flex flex-col items-center justify-start w-[160px] shrink-0">
          <div className="w-[160px] h-[600px] bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 font-mono text-sm text-center p-4 sticky top-24">
            Advertisement<br/>(160x600)
          </div>
        </aside>

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
