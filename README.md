# 💰 Fintech Dashboard (FintechOS)

A modern, responsive fintech dashboard built with React, designed to visualize financial data, track transactions, and provide actionable insights.

---

## 🚀 Live Demo

🔗 [https://zorvyn-fintech-seven.vercel.app/]

---

## 📸 Screenshots

<img width="1897" height="1072" alt="Screenshot 2026-04-05 174340" src="https://github.com/user-attachments/assets/4065d044-d59a-4d88-a31c-fe0fba48fae8" />
<img width="1903" height="1095" alt="Screenshot 2026-04-05 174413" src="https://github.com/user-attachments/assets/83905afc-655b-4bcf-80ed-cbbbb9740bec" />


---

## ✨ Features

### 📊 Dashboard Overview

* Summary cards for:

  * Total Income
  * Total Expenses
  * Net Balance
* Time-based visualization (Revenue Trend)
* Categorical visualization (Spending Breakdown - Pie Chart)

---

### 📋 Transactions Management

* View transaction history with:

  * Date
  * Category
  * Type (Income / Expense)
  * Amount
* Search transactions
* Filter by:

  * All
  * Income
  * Expense

---

### 🔐 Role-Based UI

* **Viewer**

  * Read-only access
* **Admin**

  * Can add new transactions
* Toggle roles to simulate real-world behavior

---

### 💡 Insights Section

* Highest spending category
* Monthly trend analysis
* Savings status indicator

---

### ⚙️ State Management

* Managed using **Zustand**
* Handles:

  * Transactions data
  * Filters
  * Role state

---

### 🎯 UI/UX Highlights

* Clean and modern design
* Responsive layout (mobile + desktop)
* Empty state handling (with test toggle)
* Interactive elements (hover states, transitions)
* Clear visual hierarchy

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite)
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **Charts**: Recharts

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/fintech-dashboard.git

# Navigate to project
cd fintech-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📁 Project Structure

```
src/
  components/
    dashboard/
      Charts.jsx
      Insights.jsx
      SummaryCards.jsx
    transactions/
      AddTransactionModal.jsx
      TransactionList.jsx
    ui/
      Button.jsx
  store/
    useTransactionStore.js
  utils/
    formatters.js
```

---

## 🧠 Approach

* Focused on building a **clean, scalable component structure**
* Used Zustand for **lightweight and efficient state management**
* Designed UI with **real-world fintech dashboard patterns**
* Prioritized **clarity, usability, and responsiveness**

---

## 📌 Future Improvements

* Data persistence (localStorage / backend)
* Dark mode
* Export transactions (CSV/JSON)
* Advanced filtering & analytics

---

## 🙌 Acknowledgements

* Inspired by modern fintech dashboard UI patterns
* Built as part of a frontend assessment

---

## 📬 Contact

If you have feedback or suggestions, feel free to connect!

---

⭐ If you like this project, consider giving it a star!
