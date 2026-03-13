"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AgentControlPanel from "@/components/AgentControlPanel";
import StockGrid, { StockRecord } from "@/components/StockGrid";
import { Sparkles, TrendingUp, AlertCircle, FileText } from "lucide-react";

export default function Home() {
  const [stockData, setStockData] = useState<StockRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:px-12 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">InvestFish Intelligence</h1>
            <p className="text-muted-foreground text-lg">Autonomous stock market analysis powered by TinyFish Web Agent API</p>
          </div>
          <div className="hidden lg:flex items-center gap-2 bg-secondary/50 backdrop-blur border border-border px-4 py-2 rounded-xl text-sm font-medium">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            System Online & Connected to Spring Boot
          </div>
        </header>

        {/* Dashboard Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Active Sectors" value="3" icon={<FileText className="w-5 h-5 text-blue-400" />} />
          <MetricCard title="Portals Scanned" value="14" icon={<GlobeIcon className="w-5 h-5 text-indigo-400" />} />
          <MetricCard title="Companies Analyzed" value={stockData.length > 0 ? (24 + stockData.length).toString() : "24"} icon={<Sparkles className="w-5 h-5 text-emerald-400" />} trend="+12% this week" />
          <MetricCard title="Avg Agent Confidence" value="82%" icon={<TrendingUp className="w-5 h-5 text-orange-400" />} />
        </div>

        <div className="mb-8">
          <AgentControlPanel 
            onResults={(data) => setStockData(data)} 
            onLoading={(loading) => setIsLoading(loading)} 
            isLoading={isLoading} 
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Investment Recommendations</h2>
            {stockData.length > 0 && (
              <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full border border-border">
                Showing {stockData.length} records based on historical data
              </span>
            )}
          </div>
          <StockGrid data={stockData} isLoading={isLoading} />
        </div>
        
        {/* Helper Alert for Demo */}
        <div className="mt-12 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-emerald-500 mb-1">Architecture Note</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This application is driven by a <strong>Java Spring Boot</strong> backend (`investfish.onrender.com/api/analyze`). When you click "Run Autonomous Analysis", the Next.js frontend connects directly to the Java API. In a production environment, that Java backend orchestrates the TinyFish API to aggregate thousands of pages of historical stock charts, SEC filings, and news into reliable buy/hold indicators.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const MetricCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) => (
  <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-emerald-500/30 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="p-2 bg-secondary/80 rounded-lg">{icon}</div>
    </div>
    <div className="flex items-end justify-between">
      <h4 className="text-3xl font-bold">{value}</h4>
      {trend && <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded lowercase">{trend}</span>}
    </div>
  </div>
);

// We define a simple Globe Icon just for the metric card
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
