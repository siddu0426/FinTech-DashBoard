import { create } from 'zustand';

const dummyTransactions = [
  { id: 1, date: '2024-03-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Pay' },
  { id: 2, date: '2024-03-02', amount: 120, category: 'Food', type: 'expense', description: 'Starbucks' },
  { id: 3, date: '2024-03-05', amount: 1200, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: 4, date: '2024-03-10', amount: 80, category: 'Transport', type: 'expense', description: 'Uber Ride' },
  { id: 5, date: '2024-03-12', amount: 300, category: 'Shopping', type: 'expense', description: 'Amazon' },
  { id: 6, date: '2024-03-15', amount: 50, category: 'Food', type: 'expense', description: 'Snacks' },
];

export const useTransactionStore = create((set) => ({
  transactions: dummyTransactions,
  role: 'Admin', 
  
  setRole: (role) => set({ role }),
  
  // Method to clear data and test the "First Time" experience
  clearAll: () => set({ transactions: [] }),
  
  // Method to restore dummy data
  restoreDummyData: () => set({ transactions: dummyTransactions }),

  addTransaction: (tx) => set((state) => ({ 
    transactions: [{ ...tx, id: Date.now() }, ...state.transactions] 
  })),
}));