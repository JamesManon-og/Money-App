"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Balance = {
  person: string;
  amount: number;
  type: "owe" | "owed";
};

interface SettleUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balance: Balance | null;
}

const paymentMethods = [
  "Venmo",
  "PayPal",
  "Cash",
  "Bank Transfer",
  "Zelle",
  "Other",
];

export function SettleUpModal({
  open,
  onOpenChange,
  balance,
}: SettleUpModalProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Venmo");
  const [note, setNote] = useState("");

  if (!balance) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the settlement logic
    console.log("Settling up:", { balance, amount, paymentMethod, note });
    onOpenChange(false);
    setAmount("");
    setNote("");
  };

  const isOwed = balance.type === "owed";
  const maxAmount = balance.amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isOwed ? "Record a payment" : "Settle up"}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`/placeholder.svg?height=48&width=48&text=${balance.person[0]}`}
            />
            <AvatarFallback>{balance.person[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{balance.person}</div>
            <div
              className={`text-sm ${
                isOwed ? "text-green-600" : "text-red-600"
              }`}
            >
              {isOwed ? "owes you" : "you owe"} ${balance.amount.toFixed(2)}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="settle-amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="settle-amount"
                type="number"
                step="0.01"
                max={maxAmount}
                placeholder={maxAmount.toFixed(2)}
                className="pl-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Maximum: ${maxAmount.toFixed(2)}
            </div>
          </div>

          <div>
            <Label>Payment method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="note">Note (optional)</Label>
            <Input
              id="note"
              placeholder="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {isOwed ? "Record payment" : "Settle up"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
