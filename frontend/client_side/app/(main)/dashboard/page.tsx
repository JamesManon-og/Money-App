"use client";

import { useState } from "react";
import { Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddExpenseModal } from "@/components/add-expense-modal";
import { GroupsView } from "@/components/groups-view";
import { ActivityView } from "@/components/activity-view";
import { SettleUpModal } from "@/components/settle-up-modal";

type Expense = {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
  group: string;
};

type Balance = {
  person: string;
  amount: number;
  type: "owe" | "owed";
};

function AppHeader({
  netBalance,
  totalOwed,
  totalOwe,
}: {
  netBalance: number;
  totalOwed: number;
  totalOwe: number;
}) {
  return (
    <div className="bg-emerald-600 text-white p-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Money App</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-emerald-700"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="bg-emerald-700 rounded-lg p-4">
        <div className="text-center mb-3">
          <div className="text-sm opacity-90">Your net balance</div>
          <div
            className={`text-2xl font-bold ${
              netBalance >= 0 ? "text-green-200" : "text-red-200"
            }`}
          >
            ${Math.abs(netBalance).toFixed(2)}
          </div>
          <div className="text-xs opacity-75">
            {netBalance >= 0 ? "You are owed" : "You owe"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-green-200 font-semibold">
              ${totalOwed.toFixed(2)}
            </div>
            <div className="opacity-75">you are owed</div>
          </div>
          <div className="text-center">
            <div className="text-red-200 font-semibold">
              ${totalOwe.toFixed(2)}
            </div>
            <div className="opacity-75">you owe</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabNavigation({
  activeTab,
  onTabChange,
}: {
  activeTab: "dashboard" | "groups" | "activity";
  onTabChange: (tab: "dashboard" | "groups" | "activity") => void;
}) {
  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="flex">
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "dashboard"
              ? "text-emerald-600 border-b-2 border-emerald-600"
              : "text-gray-500"
          }`}
          onClick={() => onTabChange("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "groups"
              ? "text-emerald-600 border-b-2 border-emerald-600"
              : "text-gray-500"
          }`}
          onClick={() => onTabChange("groups")}
        >
          Groups
        </button>
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === "activity"
              ? "text-emerald-600 border-b-2 border-emerald-600"
              : "text-gray-500"
          }`}
          onClick={() => onTabChange("activity")}
        >
          Activity
        </button>
      </div>
    </div>
  );
}

function DashboardContent({
  balances,
  expenses,
  onSettleUp,
}: {
  balances: Balance[];
  expenses: Expense[];
  onSettleUp: (person: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Balances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {balances.map((balance) => (
            <div
              key={balance.person}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&text=${balance.person[0]}`}
                  />
                  <AvatarFallback>{balance.person[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{balance.person}</div>
                  <div className="text-sm text-gray-500">
                    {balance.type === "owed" ? "owes you" : "you owe"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`font-semibold ${
                    balance.type === "owed" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${balance.amount.toFixed(2)}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSettleUp(balance.person)}
                >
                  Settle up
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenses.slice(0, 3).map((expense) => (
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
                <div className="font-semibold">
                  ${expense.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  paid by {expense.paidBy}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function FloatingActionButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6">
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg"
        onClick={onClick}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default function SplitWiseApp() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "groups" | "activity"
  >("dashboard");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showSettleUp, setShowSettleUp] = useState(false);
  const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Dinner at Italian Restaurant",
      amount: 120.0,
      paidBy: "You",
      splitBetween: ["You", "Alice", "Bob"],
      date: "2024-01-15",
      group: "Friends",
    },
    {
      id: "2",
      description: "Uber to Airport",
      amount: 45.5,
      paidBy: "Alice",
      splitBetween: ["You", "Alice"],
      date: "2024-01-14",
      group: "Travel",
    },
    {
      id: "3",
      description: "Grocery Shopping",
      amount: 89.3,
      paidBy: "Bob",
      splitBetween: ["You", "Bob", "Charlie"],
      date: "2024-01-13",
      group: "Roommates",
    },
  ]);

  const balances: Balance[] = [
    { person: "Alice", amount: 22.75, type: "owed" },
    { person: "Bob", amount: 29.77, type: "owe" },
    { person: "Charlie", amount: 15.5, type: "owed" },
  ];

  const totalOwed = balances
    .filter((b) => b.type === "owed")
    .reduce((sum, b) => sum + b.amount, 0);
  const totalOwe = balances
    .filter((b) => b.type === "owe")
    .reduce((sum, b) => sum + b.amount, 0);
  const netBalance = totalOwed - totalOwe;

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleSettleUp = (person: string) => {
    const balance = balances.find((b) => b.person === person);
    if (balance) {
      setSelectedBalance(balance);
      setShowSettleUp(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        netBalance={netBalance}
        totalOwed={totalOwed}
        totalOwe={totalOwe}
      />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="p-4 pb-20">
        {activeTab === "dashboard" && (
          <DashboardContent
            balances={balances}
            expenses={expenses}
            onSettleUp={handleSettleUp}
          />
        )}
        {activeTab === "groups" && <GroupsView />}
        {activeTab === "activity" && <ActivityView expenses={expenses} />}
      </div>

      <FloatingActionButton onClick={() => setShowAddExpense(true)} />

      {/* Modals */}
      <AddExpenseModal
        open={showAddExpense}
        onOpenChange={setShowAddExpense}
        onAddExpense={addExpense}
      />
      <SettleUpModal
        open={showSettleUp}
        onOpenChange={setShowSettleUp}
        balance={selectedBalance}
      />
    </div>
  );
}
