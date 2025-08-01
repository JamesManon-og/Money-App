"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/header-title";
import { TabNavigation } from "@/components/tab-navigation";
import { DashboardContent } from "@/components/dashboard-content";
import { FloatingActionButton } from "@/components/add-expense-button";
import { AddExpenseModal } from "@/components/add-expense-modal";
import { GroupsView } from "@/components/groups-view";
import { ActivityView } from "@/components/activity-view";
import { SettleUpModal } from "@/components/settle-up-modal";
import { useGetAllExpenses } from "@/lib/client/queries/expenseQueries";
import { useCreateExpense } from "@/lib/client/mutations/expenseMutation";
import { toast } from "sonner";
import { useGetAllParticipants } from "@/lib/client/queries/participantQueries";
import { useCreateParticipant } from "@/lib/client/mutations/participantMutation";
import { useGetAllPayments } from "@/lib/client/queries/paymentQueries";
import { useCreatePayment } from "@/lib/client/mutations/paymentMutation";
import { useGetUserById } from "@/lib/client/queries/userQueries";

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

export default function SplitWiseApp() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "groups" | "activity"
  >("dashboard");
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showSettleUp, setShowSettleUp] = useState(false);
  const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userIdFromToken = payload?.sub;
        setUserId(userIdFromToken);
        console.log("Decoded payload:", payload);
        console.log("User ID:", userIdFromToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found in localStorage.");
    }
  }, []);

  const { data: user } = useGetUserById(userId || "");
  console.log("User data:", user);

  const { data: expenses } = useGetAllExpenses();
  const { mutate: createExpense } = useCreateExpense({
    onSuccess: () => {
      toast.success("Expense added successfully!");
      setShowAddExpense(false);
    },
    onError: (error) => {
      toast.error(`Failed to add expense: ${error.message}`);
    },
  });

  const { data: participants } = useGetAllParticipants();
  const { mutate: createParticipant } = useCreateParticipant({
    onSuccess: () => {
      toast.success("Participant added successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add participant: ${error.message}`);
    },
  });

  const { data: payments } = useGetAllPayments();
  const { mutate: createPayment } = useCreatePayment({
    onSuccess: () => {
      toast.success("Payment recorded successfully!");
      setShowSettleUp(false);
    },
    onError: (error) => {
      toast.error(`Failed to record payment: ${error.message}`);
    },
  });

  console.log("Expenses data:", expenses);
  console.log("Participants data:", participants);
  console.log("Payments data:", payments);

  // Mock balances data (you can replace this with real API call later)
  const balances: Balance[] = [
    { person: "Alice", amount: 22.75, type: "owed" },
    { person: "Bob", amount: 29.77, type: "owe" },
    { person: "Charlie", amount: 15.5, type: "owed" },
  ];

  const totalOwed =
    participants
      ?.filter((p) => p.shareAmount)
      .reduce((sum: number, p) => sum + (p.shareAmount || 0), 0) || 0;
  const totalOwe = balances
    .filter((b) => b.type === "owe")
    .reduce((sum: number, b) => sum + b.amount, 0);
  const netBalance = totalOwed - totalOwe;

  const addExpense = (expense: Omit<Expense, "id">) => {
    createExpense({
      expenseData: {
        name: expense.description,
        totalAmount: expense.amount,
        paidById: userId || "",
        date: expense.date,
        notes: expense.group,
      },
    });
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
