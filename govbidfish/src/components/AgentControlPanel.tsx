import React, { useState } from 'react';
import { Play, Loader2, Globe, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StockRecord } from './StockGrid';

interface AgentControlPanelProps {
  onResults: (data: StockRecord[]) => void;
  onLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const AgentControlPanel = ({ onResults, onLoading, isLoading }: AgentControlPanelProps) => {
  const [profile, setProfile] = useState("Tech Giants (AI)");
  const [statusText, setStatusText] = useState("Agent Ready");
  const [progress, setProgress] = useState(0);

  const runAgent = async () => {
    onLoading(true);
    setProgress(10);
    setStatusText("Initializing Agent Environment...");
    
    // Simulate multi-step progress logging typical of web agents reading historical data
    setTimeout(() => { setProgress(30); setStatusText("Authenticating and bypassing anti-bot measures at Yahoo Finance..."); }, 800);
    setTimeout(() => { setProgress(45); setStatusText("Navigating DOM: locating historical P/E and growth charts..."); }, 1600);
    setTimeout(() => { setProgress(60); setStatusText("Reading recent SEC 10-K filings for forward-looking statements..."); }, 2200);
    setTimeout(() => { setProgress(80); setStatusText("Aggregating historical trends to compute investment confidence..."); }, 2800);

    try {
      // Forward request to our Spring Boot Backend
      const response = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileName: profile,
          targetAction: "analyze_stock_history"
        })
      });
      
      const resData = await response.json();
      
      if (resData.success) {
        setProgress(100);
        setStatusText(`Mission Complete: Extracted ${resData.data.length} stock recommendations.`);
        setTimeout(() => {
          onResults(resData.data);
          onLoading(false);
          setTimeout(() => { setProgress(0); setStatusText("Agent Ready"); }, 3000);
        }, 500);
      } else {
        setStatusText("Error navigating financial portals.");
        onLoading(false);
      }
    } catch (e) {
      console.error(e);
      setStatusText("Backend Sprint Boot connection failed. Is it running on port 8080?");
      onLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div className="space-y-2 flex-1">
          <h2 className="text-xl font-bold flex items-center">
            TinyFish Stock Analyst <span className="ml-2 px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">Live Web Agent</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Deploys a headless browser to autonomously navigate financial portals, read historical charts, and determine the best companies to invest in.
          </p>
          
          <div className="flex items-center gap-4 mt-4 pt-2">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border">
              <Globe className="w-3 h-3 text-blue-400" /> <span>Proxies: Rotating</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> <span>Stealth: Active</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border">
              <Database className="w-3 h-3 text-purple-400" /> <span>Source: SEC Filings & Charts</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <select 
            value={profile} 
            onChange={(e) => setProfile(e.target.value)}
            disabled={isLoading}
            className="w-full md:w-64 bg-background border border-border text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-50 appearance-none"
          >
            <option>Tech Giants (AI)</option>
            <option>Healthcare / Biotech</option>
            <option>Finance Core</option>
            <option>Energy Sector</option>
            <option>General Market</option>
          </select>
          
          <button 
            onClick={runAgent}
            disabled={isLoading}
            className="w-full md:w-64 relative overflow-hidden group bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing History...</>
            ) : (
              <><Play className="w-5 h-5" fill="currentColor" /> Run Autonomous Analysis</>
            )}
            
            {/* Glossy sheen effect overlay */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 pt-5 border-t border-border/50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center text-sm font-medium text-emerald-400">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {statusText}
            </div>
            <div className="text-xs font-mono text-muted-foreground">{progress}%</div>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      {!isLoading && progress === 100 && (
         <div className="mt-6 pt-5 border-t border-border/50 animate-in fade-in duration-500">
           <div className="flex items-center text-sm font-medium text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
             <CheckCircle2 className="w-5 h-5 mr-2" />
             {statusText}
           </div>
         </div>
      )}
    </div>
  );
};

export default AgentControlPanel;
