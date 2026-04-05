const Insights = ({ transactions }) => {
  // Logic to find highest spending category
  const categoryTotals = transactions.reduce((acc, curr) => {
    if (curr.type === 'expense') {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    }
    return acc;
  }, {});
  
  const topCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, 'N/A');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-5 rounded-xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-indigo-100 text-sm font-medium">Smart Insight</p>
          <h4 className="text-xl font-semibold mt-1">
            You spent the most on <span className="underline decoration-wavy underline-offset-4">{topCategory}</span> this month.
          </h4>
          <button className="mt-4 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
            View Breakdown
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <svg width="120" height="120" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3v6h8V3h-8zm0 18h8v-10h-8v10zm-10 0h8V11H3v10zm0-18v14h8V3H3z"/></svg>
        </div>
      </div>
    </div>
  );
};