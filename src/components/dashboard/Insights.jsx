import React from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';

const Insights = () => {
  // Accessing your Zustand store for dynamic data
  const { transactions } = useTransactionStore();

  // Logic to calculate insights dynamically (Example)
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
  
  // Find highest category
  const categoryMap = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const highestCategory = Object.keys(categoryMap).reduce((a, b) => categoryMap[a] > categoryMap[b] ? a : b, 'N/A');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {/* Card 1: Category Insight */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
          <span className="text-xl">💸</span>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Highest Spending</p>
          <p className="text-lg font-bold text-gray-900">{highestCategory}</p>
        </div>
      </div>

      {/* Card 2: Trend Insight */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
          <span className="text-xl">📊</span>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Monthly Trend</p>
          <p className="text-lg font-bold text-gray-900">+12% Increase</p>
        </div>
      </div>

      {/* Card 3: Savings/Status Insight */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <span className="text-xl">💰</span>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Savings Status</p>
          <p className="text-lg font-bold text-emerald-600 font-semibold">Saving Well</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;