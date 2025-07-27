"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Balance = {
  person: string;
  amount: number;
  type: "owe" | "owed";
};

interface BalancesListProps {
  balances: Balance[];
  onSettleUp: (person: string) => void;
}

export function BalancesList({ balances, onSettleUp }: BalancesListProps) {
  return (
    <>
      {balances.map((balance) => (
        <div key={balance.person} className="flex items-center justify-between">
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
              ₱{balance.amount.toFixed(2)}
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
    </>
  );
}
