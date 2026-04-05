import React, { useState, useMemo } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';

const TransactionList = () => {
  const { transactions = [], role = 'viewer' } = useTransactionStore() || {};
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Logic check for Admin role
  const isAdmin = role?.toLowerCase() === 'admin';

  const filteredData = useMemo(() => {
    return transactions.filter((item) => {
      const description = item.description || item.category || '';
      const category = item.category || '';
      
      const matchesSearch = 
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        activeFilter === 'All' || item.type?.toLowerCase() === activeFilter.toLowerCase();
      
      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, activeFilter]);

  return (
    <div className="mt-12 space-y-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search records..."
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            {['All', 'Income', 'Expense'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-[11px] font-bold rounded-md transition-all ${
                  activeFilter === filter 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Corrected Syntax Here */}
        {isAdmin && (
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
            + New Transaction
          </button>
        )}
      </div>

      {/* Table / Empty State Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[420px] flex flex-col">
        {filteredData.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
              <span className="text-4xl grayscale opacity-40">📂</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">No results found</h3>
            <p className="text-sm text-slate-500 max-w-[320px] mt-2 mb-8 leading-relaxed">
              We couldn't find any records for "{searchTerm || activeFilter}".
            </p>
            {isAdmin ? (
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-8 py-3 rounded-xl shadow-xl shadow-indigo-100 transition-all active:scale-95">
                Create First Transaction
              </button>
            ) : (
              <div className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200">
                Read-Only Access
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Transaction Details</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Type</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((t, idx) => (
                  <tr key={t.id || idx} className="group hover:bg-indigo-50/30 transition-all duration-200">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ring-4 ${
                          t.type === 'income' ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'
                        }`} />
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                            {t.description || t.category}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono italic tracking-tighter">
                            {t.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter border ${
                        t.type === 'income' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-8 py-5 text-right font-bold tabular-nums ${
                      t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {t.type === 'income' ? '+' : '-'} ₹{Number(t.amount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;