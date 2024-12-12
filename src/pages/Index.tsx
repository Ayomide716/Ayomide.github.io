import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank, Menu } from "lucide-react";
import { ExpenseCard } from "@/components/ExpenseCard";
import { ExpenseChart } from "@/components/ExpenseChart";
import { TransactionList, Transaction } from "@/components/TransactionList";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const STORAGE_KEY = 'expense-tracker-transactions';

const getInitialTransactions = (): Transaction[] => {
  const storedTransactions = localStorage.getItem(STORAGE_KEY);
  if (storedTransactions) {
    return JSON.parse(storedTransactions);
  }
  
  // Default transactions if nothing in localStorage
  return [
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
};

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(getInitialTransactions);
  const isMobile = useIsMobile();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

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

  const MobileHeader = () => (
    <div className="flex items-center justify-between p-4 border-b">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <div className="flex flex-col gap-4 mt-8">
            <TransactionDialog onAddTransaction={handleAddTransaction} />
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="font-montserrat text-xl font-bold">Financial Overview</h1>
      <div className="w-10" /> {/* Spacer for balance */}
    </div>
  );

  const DesktopHeader = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold">
        Financial Overview
      </h1>
      <TransactionDialog onAddTransaction={handleAddTransaction} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
      
      <div className="p-4 sm:container sm:px-4 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <ExpenseCard
            title="Balance"
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

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
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
    </div>
  );
};

export default Index;