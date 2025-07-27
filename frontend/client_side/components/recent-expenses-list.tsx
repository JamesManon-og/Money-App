import { Receipt } from "lucide-react";

type Expense = {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
  group: string;
};

interface RecentExpensesListProps {
  expenses: Expense[];
}

export function RecentExpensesList({ expenses }: RecentExpensesListProps) {
  return (
    <>
      {expenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Receipt className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="font-medium">{expense.description}</div>
              <div className="text-sm text-gray-500">
                {expense.date} • {expense.group}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">₱{expense.amount.toFixed(2)}</div>
            <div className="text-sm text-gray-500">
              paid by {expense.paidBy}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
