"use client";

type Tab = "dashboard" | "groups" | "activity";

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { key: Tab; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "groups", label: "Groups" },
    { key: "activity", label: "Activity" },
  ];

  return (
    <div className="bg-white border-b sticky top-0 z-10">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === tab.key
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
