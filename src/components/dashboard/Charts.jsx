import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Charts = ({ data = [], transactions = [] }) => {
  
  // 1. Process Pie Chart Data
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type?.toLowerCase() === 'expense');
    if (expenses.length === 0) return [];

    const map = expenses.reduce((acc, curr) => {
      const cat = curr.category || 'Other';
      acc[cat] = (acc[cat] || 0) + (Number(curr.amount) || 0);
      return acc;
    }, {});

    return Object.keys(map).map(name => ({ name, value: map[name] }));
  }, [transactions]);

  // 2. Global Empty State Check
  // If transactions are empty, show a polished placeholder instead of empty axes
  if (transactions.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 my-8">
        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl opacity-20">📊</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Analytics Data</h3>
          <p className="text-sm text-slate-400 max-w-xs mt-1">
            Charts will populate automatically once you record your first income or expense.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
      {/* Line Chart (Trend) */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Growth Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
            />
            <Area type="monotone" dataKey="amount" stroke="#4f46e5" fillOpacity={0.1} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart (Allocation) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px] flex flex-col">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Spending Allocation</h3>
        <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-slate-300">
              <p className="text-xs font-bold uppercase">No Expense Records</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;