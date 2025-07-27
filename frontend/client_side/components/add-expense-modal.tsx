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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Expense = {
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  date: string;
  group: string;
};

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExpense: (expense: Expense) => void;
}

const friends = ["You", "Alice", "Bob", "Charlie", "Diana"];
const groups = ["Friends", "Roommates", "Travel", "Work"];

export function AddExpenseModal({
  open,
  onOpenChange,
  onAddExpense,
}: AddExpenseModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("You");
  const [splitBetween, setSplitBetween] = useState<string[]>(["You"]);
  const [group, setGroup] = useState("Friends");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || splitBetween.length === 0) return;

    onAddExpense({
      description,
      amount: Number.parseFloat(amount),
      paidBy,
      splitBetween,
      date: new Date().toISOString().split("T")[0],
      group,
    });

    // Reset form
    setDescription("");
    setAmount("");
    setPaidBy("You");
    setSplitBetween(["You"]);
    setGroup("Friends");
    onOpenChange(false);
  };

  const toggleSplitPerson = (person: string) => {
    setSplitBetween((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label>Paid by</Label>
            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {friends.map((friend) => (
                  <SelectItem key={friend} value={friend}>
                    {friend}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Group</Label>
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {groups.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Split between</Label>
            <div className="space-y-2 mt-2">
              {friends.map((friend) => (
                <div key={friend} className="flex items-center space-x-3">
                  <Checkbox
                    id={friend}
                    checked={splitBetween.includes(friend)}
                    onCheckedChange={() => toggleSplitPerson(friend)}
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&text=${friend[0]}`}
                    />
                    <AvatarFallback>{friend[0]}</AvatarFallback>
                  </Avatar>
                  <Label htmlFor={friend} className="flex-1 cursor-pointer">
                    {friend}
                  </Label>
                  {splitBetween.includes(friend) && amount && (
                    <span className="text-sm text-gray-500">
                      $
                      {(
                        Number.parseFloat(amount) / splitBetween.length
                      ).toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
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
              Add expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
