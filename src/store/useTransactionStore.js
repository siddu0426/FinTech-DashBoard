import { create } from 'zustand';

const dummyTransactions = [
  { id: 1, date: '2024-03-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: 2, date: '2024-03-02', amount: 120, category: 'Food', type: 'expense' },
  { id: 3, date: '2024-03-05', amount: 1200, category: 'Rent', type: 'expense' },
  { id: 4, date: '2024-03-10', amount: 80, category: 'Transport', type: 'expense' },
  { id: 5, date: '2024-03-12', amount: 300, category: 'Shopping', type: 'expense' },
  { id: 6, date: '2024-03-15', amount: 50, category: 'Food', type: 'expense' },
];

export const useTransactionStore = create((set) => ({
  transactions: dummyTransactions,
  role: 'Admin', // 'Admin' or 'Viewer'
  filters: { search: '', category: 'All', type: 'All' },
  
  setRole: (role) => set({ role }),
  
  setFilters: (newFilters) => 
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),

  addTransaction: (tx) => set((state) => ({ 
    transactions: [{ ...tx, id: Date.now() }, ...state.transactions] 
  })),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),
}));