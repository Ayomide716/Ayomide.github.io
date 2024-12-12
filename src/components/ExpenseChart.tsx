import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "./TransactionList";

interface ExpenseChartProps {
  transactions: Transaction[];
}

export function ExpenseChart({ transactions = [] }: ExpenseChartProps) {
  const monthlyData = (transactions || []).reduce((acc: Record<string, number>, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + transaction.amount;
    return acc;
  }, {});

  const data = Object.entries(monthlyData).map(([name, amount]) => ({
    name,
    amount,
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 pt-4 px-3 sm:pb-4 sm:pt-6 sm:px-4">
        <CardTitle className="text-sm sm:text-base lg:text-lg">Expense Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-0 sm:pl-2">
        <div className="h-[180px] xs:h-[200px] sm:h-[250px] lg:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 10 }}
                tickMargin={5}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickMargin={5}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}