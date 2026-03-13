import React from 'react';
import { LayoutDashboard, Target, History, Settings, LogOut, LineChart } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border min-h-screen flex flex-col p-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <LineChart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            InvestFish
          </h1>
          <p className="text-xs text-muted-foreground font-medium">Stock Analysis</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <NavItem icon={<Target size={20} />} label="Search Profiles" />
        <NavItem icon={<History size={20} />} label="Agent History" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
      </nav>

      <div className="mt-auto">
        <button className="flex items-center w-full gap-3 px-3 py-3 text-sm font-medium text-muted-foreground rounded-lg hover:bg-secondary/50 hover:text-foreground transition-all duration-200">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <button
      className={`flex items-center w-full gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        active 
          ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Sidebar;
