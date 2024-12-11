import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react";
import { ExpenseCard } from "@/components/ExpenseCard";
import { ExpenseChart } from "@/components/ExpenseChart";
import { TransactionList, Transaction } from "@/components/TransactionList";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useState } from "react";

const initialTransactions: Transaction[] = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -120.50,
    category: "Food",
    date: "2024-04-10",
    type: "expense"
  },
  {
    id: 2,
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "2024-04-09",
    type: "expense"
  },
  {
    id: 3,
    description: "Monthly Salary",
    amount: 5000.00,
    category: "Salary",
    date: "2024-04-01",
    type: "income"
  },
];

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const calculateTotals = () => {
    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = transactions.reduce((sum, t) => sum + t.amount, 0);
    const savings = income + expenses;

    return { income, expenses, balance, savings };
  };

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const id = Math.max(0, ...transactions.map((t) => t.id)) + 1;
    setTransactions([...transactions, { ...newTransaction, id }]);
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totals = calculateTotals();

  return (
    <div className="container px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold">Financial Overview</h1>
        <TransactionDialog onAddTransaction={handleAddTransaction} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <ExpenseCard
          title="Total Balance"
          amount={totals.balance}
          icon={<Wallet className="h-4 w-4 text-primary" />}
        />
        <ExpenseCard
          title="Income"
          amount={totals.income}
          icon={<ArrowUpRight className="h-4 w-4 text-green-500" />}
        />
        <ExpenseCard
          title="Expenses"
          amount={totals.expenses}
          icon={<ArrowDownRight className="h-4 w-4 text-red-500" />}
        />
        <ExpenseCard
          title="Savings"
          amount={totals.savings}
          icon={<PiggyBank className="h-4 w-4 text-accent" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-6 sm:mb-8">
        <div className="lg:col-span-4">
          <ExpenseChart transactions={transactions} />
        </div>
        <div className="lg:col-span-3">
          <TransactionList
            transactions={transactions}
            onUpdateTransaction={handleUpdateTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;