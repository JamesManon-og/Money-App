import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BalancesList } from "./balances-list";
import { RecentExpensesList } from "./recent-expenses-list";

type Balance = {
  person: string;
  amount: number;
  type: "owe" | "owed";
};

type Expense = {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
  group: string;
};

interface DashboardContentProps {
  balances: Balance[];
  expenses: Expense[];
  onSettleUp: (person: string) => void;
}

export function DashboardContent({
  balances,
  expenses,
  onSettleUp,
}: DashboardContentProps) {
  return (
    <div className="space-y-4">
      {/* Balances */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Balances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <BalancesList balances={balances} onSettleUp={onSettleUp} />
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <RecentExpensesList expenses={expenses.slice(0, 3)} />
        </CardContent>
      </Card>
    </div>
  );
}
