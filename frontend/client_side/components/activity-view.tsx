import { Receipt, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Expense = {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
  group: string;
};

interface ActivityViewProps {
  expenses: Expense[];
}

const activities = [
  {
    id: "settlement-1",
    type: "settlement",
    description: "Alice paid you",
    amount: 25.0,
    date: "2024-01-16",
    person: "Alice",
  },
  {
    id: "expense-1",
    type: "expense",
    description: "Coffee at Starbucks",
    amount: 15.6,
    date: "2024-01-15",
    paidBy: "You",
    group: "Work",
  },
];

export function ActivityView({ expenses }: ActivityViewProps) {
  const allActivities = [
    ...activities,
    ...expenses.map((expense) => ({
      ...expense,
      type: "expense" as const,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent activity</h2>

      <div className="space-y-3">
        {allActivities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    activity.type === "settlement"
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                >
                  {activity.type === "settlement" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Receipt className="h-5 w-5 text-gray-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium">{activity.description}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(activity.date)}
                    {activity.type === "expense" && "group" in activity && (
                      <> • {activity.group}</>
                    )}
                  </div>
                  {activity.type === "expense" && "paidBy" in activity && (
                    <div className="text-xs text-gray-400 mt-1">
                      Paid by {activity.paidBy}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div
                    className={`font-semibold ${
                      activity.type === "settlement"
                        ? "text-green-600"
                        : "text-gray-900"
                    }`}
                  >
                    ${activity.amount.toFixed(2)}
                  </div>
                  {activity.type === "settlement" && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 text-xs mt-1"
                    >
                      Payment
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
