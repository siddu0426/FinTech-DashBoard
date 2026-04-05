import React from 'react';
import { useTransactionStore } from './store/useTransactionStore';
import SummaryCards from './components/dashboard/SummaryCards';
import Charts from './components/dashboard/Charts';
import TransactionList from './components/transactions/TransactionList';
import { LayoutDashboard, ShieldCheck, User, Plus } from 'lucide-react';

function App() {
  const { transactions, role, setRole } = useTransactionStore();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Fintech<span className="text-indigo-600">OS</span></span>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setRole('Viewer')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'Viewer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <User size={14} /> Viewer
            </button>
            <button 
              onClick={() => setRole('Admin')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'Admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <ShieldCheck size={14} /> Admin
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 text-sm">Real-time monitoring of your digital assets.</p>
          </div>
          {role === 'Admin' && (
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
              <Plus size={18} /> New Transaction
            </button>
          )}
        </div>

        <SummaryCards transactions={transactions} />
        <Charts transactions={transactions} />
        
        <h2 className="text-xl font-bold mb-4 text-slate-800">History</h2>
        <TransactionList transactions={transactions} role={role} />
      </main>
    </div>
  );
}

const RoleToggle = ({ role, setRole }) => (
  <div className="flex bg-gray-100 p-1 rounded-lg w-fit mb-6">
    {['admin', 'viewer'].map((r) => (
      <button
        key={r}
        onClick={() => setRole(r)}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
          role === r ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {r.charAt(0).toUpperCase() + r.slice(1)}
      </button>
    ))}
  </div>
);

export const PrimaryButton = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
  >
    {children}
  </button>
);

export default App;