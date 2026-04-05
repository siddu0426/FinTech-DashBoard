import { formatCurrency } from '../../utils/formatters';

const TransactionList = ({ transactions, role }) => {
  if (transactions?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">No transactions found</p>
        <p className="text-sm text-gray-400">Start by adding your first expense.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Description</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Amount</th>
            {role === 'Admin' && <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4 font-medium text-gray-900">{t.description}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{t.category}</span>
              </td>
              <td className={`px-6 py-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
              </td>
              {role === 'Admin' && (
                <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;