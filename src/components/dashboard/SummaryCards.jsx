import { formatCurrency } from '../../utils/formatters';
import { DollarSign, ArrowUpRight, Wallet } from 'lucide-react';

const Card = ({ title, amount, icon, trend, type }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 tabular-nums">
          {formatCurrency(amount)}
        </h3>
        {trend !== null && (
          <p className={`text-xs mt-2 font-medium ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% <span className="text-gray-400">vs last month</span>
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg transition-colors ${type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
        {icon}
      </div>
    </div>
  </div>
);

const SummaryCards = ({ transactions }) => {
  const totalIncome = transactions
    .filter((txn) => txn.type === 'income')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalExpense = transactions
    .filter((txn) => txn.type === 'expense')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const cards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: <DollarSign size={20} />,
      trend: 12,
      type: 'income',
    },
    {
      title: 'Total Expense',
      amount: totalExpense,
      icon: <ArrowUpRight size={20} />,
      trend: -8,
      type: 'expense',
    },
    {
      title: 'Net Balance',
      amount: netBalance,
      icon: <Wallet size={20} />,
      trend: netBalance >= 0 ? 5 : -5,
      type: netBalance >= 0 ? 'income' : 'expense',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;
