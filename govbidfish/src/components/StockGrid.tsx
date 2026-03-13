import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface Point {
  month: string;
  price: number;
}

export interface StockRecord {
  id: string;
  ticker: string;
  name: string;
  recommendation: 'Buy' | 'Hold' | 'Sell';
  rationale: string;
  currentPrice: string;
  confidenceScore: string;
  history: Point[];
}

interface StockGridProps {
  data: StockRecord[];
  isLoading: boolean;
}

const StockGrid = ({ data, isLoading }: StockGridProps) => {
  const [selectedStock, setSelectedStock] = useState<StockRecord | null>(null);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center border border-dashed rounded-xl border-border bg-card/30 backdrop-blur-sm">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin mb-4"></div>
        <p className="text-muted-foreground animate-pulse">Scanning historical financials & market charts...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center border border-dashed rounded-xl border-border bg-card/30 backdrop-blur-sm">
        <Activity className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <p className="text-muted-foreground">Run the analysis engine to evaluate stock histories.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 auto-rows-max">
        {data.map((stock, index) => (
          <div 
            key={stock.id} 
            onClick={() => setSelectedStock(stock)}
            className="group p-5 rounded-xl bg-card border border-border shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl leading-tight group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  {stock.ticker}
                  <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">{stock.name}</span>
                </h3>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5
                ${stock.recommendation === 'Buy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 
                  stock.recommendation === 'Hold' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 
                  'bg-red-500/10 text-red-400 border-red-500/30'}`}
              >
                {stock.recommendation === 'Buy' ? <TrendingUp className="w-3.5 h-3.5" /> : 
                stock.recommendation === 'Hold' ? <Activity className="w-3.5 h-3.5" /> : 
                <TrendingDown className="w-3.5 h-3.5" />}
                {stock.recommendation.toUpperCase()}
              </div>
            </div>
            
            <div className="mb-4 text-sm text-foreground/80 leading-relaxed italic bg-secondary/30 p-3 rounded-lg border border-border/50">
              "{stock.rationale}"
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center text-sm font-medium">
                <DollarSign className="w-4 h-4 text-emerald-400 mr-1" />
                <span className="text-emerald-100">{stock.currentPrice}</span>
              </div>
              
              <div className="flex items-center text-xs font-medium text-muted-foreground flex-col md:flex-row md:gap-4">
                <span className="flex items-center">
                  <BarChart2 className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                  Agent Confidence: <span className="ml-1 text-indigo-400">{stock.confidenceScore}</span>
                </span>
                <span className="hidden md:inline text-xs mt-1 md:mt-0 px-2 py-0.5 border border-border rounded text-muted-foreground group-hover:bg-emerald-500/10 transition-colors">
                  View Chart →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Modal */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedStock(null)}>
          <div className="bg-card w-full max-w-3xl border border-border rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-border/50 flex justify-between items-start bg-secondary/30">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {selectedStock.name} <span className="text-muted-foreground">({selectedStock.ticker})</span>
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-mono font-medium text-emerald-400">{selectedStock.currentPrice}</span>
                  <div className={`px-2 py-0.5 rounded text-xs font-bold border flex items-center gap-1
                    ${selectedStock.recommendation === 'Buy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 
                      selectedStock.recommendation === 'Hold' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 
                      'bg-red-500/10 text-red-400 border-red-500/30'}`}
                  >
                    {selectedStock.recommendation.toUpperCase()} SIGNAL
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStock(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-4 h-4" /> 6-Month Historical Pricing Trend
              </h3>
              
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedStock.history}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#888" 
                      tick={{ fill: '#888', fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      domain={['auto', 'auto']} 
                      stroke="#888" 
                      tick={{ fill: '#888', fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
                      formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Price']}
                      labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={selectedStock.recommendation === 'Buy' ? '#34d399' : selectedStock.recommendation === 'Hold' ? '#fb923c' : '#f87171'} 
                      strokeWidth={3} 
                      dot={{ fill: '#1f2937', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50 text-sm text-muted-foreground leading-relaxed">
                <strong className="text-white block mb-2">Agent Analytic Rationale:</strong>
                "{selectedStock.rationale}"
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockGrid;
