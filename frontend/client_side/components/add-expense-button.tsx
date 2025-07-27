"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
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
