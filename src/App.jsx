import React from 'react';
import { useTransactionStore } from './store/useTransactionStore';
import SummaryCards from './components/dashboard/SummaryCards';
import Charts from './components/dashboard/Charts';
import TransactionList from './components/transactions/TransactionList';
import Insights from './components/dashboard/Insights';
import { LayoutDashboard, ShieldCheck, User, Plus, RefreshCcw } from 'lucide-react';

// Real-time Trend Data for the Line Chart
const chartData = [
  { date: '2024-03-01', amount: 4000 },
  { date: '2024-03-05', amount: 1500 },
  { date: '2024-03-10', amount: 3700 },
  { date: '2024-03-15', amount: 4500 },
  { date: '2024-03-20', amount: 2300 },
  { date: '2024-03-25', amount: 1000 },
  { date: '2024-03-30', amount: 4500 },
  { date: '2024-04-01', amount: 5000 }, 
];

function App() {
  // Pulling state and actions from Zustand store
  const { transactions, role, setRole, clearAll, restoreDummyData } = useTransactionStore();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Zorvyn</span>
          </div>
          
          {/* Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setRole('Viewer')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'Viewer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User size={14} /> Viewer
            </button>
            <button 
              onClick={() => setRole('Admin')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'Admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ShieldCheck size={14} /> Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm font-medium">Monitoring financial health and asset distribution.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Dev Tool: Toggle Empty State */}
            <button 
              onClick={transactions.length > 0 ? clearAll : restoreDummyData}
              className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors px-3 py-2 border border-dashed border-slate-300 rounded-lg"
            >
              <RefreshCcw size={12} /> {transactions.length > 0 ? "Test Empty State" : "Restore Data"}
            </button>

            {role === 'Admin' && (
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                <Plus size={18} /> New Transaction
              </button>
            )}
          </div>
        </div>

        {/* 1. Statistics Summary */}
        <SummaryCards transactions={transactions} />
        
        {/* 2. Visualizations (Line & Pie) */}
        <Charts transactions={transactions} data={chartData} />

        {/* 3. Automated Insights */}
        <Insights transactions={transactions} /> 

        {/* 4. Detailed Transaction Ledger */}
        <div className="pt-4">
          <TransactionList />
        </div>

      </main>

      {/* Subtle Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-10 border-t border-slate-200 mt-10">
        <p className="text-center text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">
          Zorvyn © 2026 • Secure Financial Systems
        </p>
      </footer>
    </div>
  );
}

export default App;