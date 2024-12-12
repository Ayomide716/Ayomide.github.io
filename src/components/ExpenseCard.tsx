import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface ExpenseCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
}

export function ExpenseCard({ title, amount, icon }: ExpenseCardProps) {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-2 px-2 sm:pb-2 sm:pt-4 sm:px-4">
        <CardTitle className="text-xs sm:text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="pb-2 pt-0 px-2 sm:pb-4 sm:px-4">
        <div className="text-sm sm:text-2xl font-bold truncate">{formatCurrency(amount)}</div>
      </CardContent>
    </Card>
  );
}