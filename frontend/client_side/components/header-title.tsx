interface AppHeaderProps {
  netBalance: number;
  totalOwed: number;
  totalOwe: number;
}

export function AppHeader({ netBalance, totalOwed, totalOwe }: AppHeaderProps) {
  return (
    <div className="bg-emerald-600 text-white p-4 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-center">Money App</h1>
      </div>

      {/* Balance Summary */}
      <div className="bg-emerald-700 rounded-lg p-4">
        <div className="text-center mb-3">
          <div className="text-sm opacity-90">Your net balance</div>
          <div
            className={`text-2xl font-bold ${
              netBalance >= 0 ? "text-green-200" : "text-red-200"
            }`}
          >
            ₱{Math.abs(netBalance).toFixed(2)}
          </div>
          <div className="text-xs opacity-75">
            {netBalance >= 0 ? "You are owed" : "You owe"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-green-200 font-semibold">
              ₱{totalOwed.toFixed(2)}
            </div>
            <div className="opacity-75">you are owed</div>
          </div>
          <div className="text-center">
            <div className="text-red-200 font-semibold">
              ₱{totalOwe.toFixed(2)}
            </div>
            <div className="opacity-75">you owe</div>
          </div>
        </div>
      </div>
    </div>
  );
}
