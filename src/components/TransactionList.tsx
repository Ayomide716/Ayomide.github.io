import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: 120.50,
    category: "Food",
    date: "2024-04-10",
  },
  {
    id: 2,
    description: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: "2024-04-09",
  },
  {
    id: 3,
    description: "Gas Station",
    amount: 45.00,
    category: "Transportation",
    date: "2024-04-08",
  },
];

export function TransactionList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className={`font-medium ${transaction.amount < 0 ? "text-red-500" : ""}`}>
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}