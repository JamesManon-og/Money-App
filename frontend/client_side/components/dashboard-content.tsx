import { Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Participant } from "@/lib/types/model";

type Balance = {
  person: string;
  amount: number;
  type: "owe" | "owed";
};

interface DashboardContentProps {
  balances: Balance[];
  participants: Participant[];
  onSettleUp: (person: string) => void;
}

export function DashboardContent({
  balances,
  participants,
  onSettleUp,
}: DashboardContentProps) {
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
          {participants && participants.length > 0 ? (
            participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {participant.expense?.name || "No description"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {participant.expense?.date
                        ? new Date(
                            participant.expense.date
                          ).toLocaleDateString()
                        : "No date"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    ₱{participant.shareAmount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    paid by {participant.expense?.paidBy.name || "Unknown"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No expenses yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
