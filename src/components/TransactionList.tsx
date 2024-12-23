import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface TransactionListProps {
  transactions: Transaction[];
  onUpdateTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: number) => void;
}

export function TransactionList({ 
  transactions,
  onUpdateTransaction,
  onDeleteTransaction
}: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id: number) => {
    onDeleteTransaction(id);
    toast({
      title: "Success",
      description: "Transaction deleted successfully",
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTransaction) {
      onUpdateTransaction(editingTransaction);
      setEditingTransaction(null);
      toast({
        title: "Success",
        description: "Transaction updated successfully",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-secondary/50 gap-2 sm:gap-4"
            >
              <div className="space-y-1 w-full sm:w-auto">
                <p className="text-sm font-medium leading-none">
                  {transaction.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.category}
                </p>
              </div>
              <div className="flex flex-row sm:flex-row items-center justify-between sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className={`text-sm font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                  {formatCurrency(transaction.amount)}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit(transaction)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editingTransaction.description}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-amount">Amount</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={Math.abs(editingTransaction.amount)}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      amount:
                        editingTransaction.type === "expense"
                          ? -Math.abs(Number(e.target.value))
                          : Math.abs(Number(e.target.value)),
                    })
                  }
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editingTransaction.category}
                  onValueChange={(value) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">Update Transaction</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
