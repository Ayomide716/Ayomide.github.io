import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react";
import { ExpenseCard } from "@/components/ExpenseCard";
import { ExpenseChart } from "@/components/ExpenseChart";
import { TransactionList } from "@/components/TransactionList";

const Index = () => {
  return (
    <div className="container py-10">
      <h1 className="font-montserrat text-4xl font-bold mb-8">Financial Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <ExpenseCard
          title="Total Balance"
          amount={5240.50}
          icon={<Wallet className="h-4 w-4 text-primary" />}
        />
        <ExpenseCard
          title="Income"
          amount={2850.00}
          icon={<ArrowUpRight className="h-4 w-4 text-green-500" />}
        />
        <ExpenseCard
          title="Expenses"
          amount={-1250.00}
          icon={<ArrowDownRight className="h-4 w-4 text-red-500" />}
        />
        <ExpenseCard
          title="Savings"
          amount={1600.00}
          icon={<PiggyBank className="h-4 w-4 text-accent" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7 mb-8">
        <ExpenseChart />
        <div className="md:col-span-3">
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default Index;