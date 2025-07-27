import { Users, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const groups = [
  {
    id: "1",
    name: "Friends",
    members: ["You", "Alice", "Bob"],
    balance: 45.5,
    type: "owed" as const,
  },
  {
    id: "2",
    name: "Roommates",
    members: ["You", "Charlie", "Bob"],
    balance: 29.77,
    type: "owe" as const,
  },
  {
    id: "3",
    name: "Travel",
    members: ["You", "Alice"],
    balance: 0,
    type: "settled" as const,
  },
  {
    id: "4",
    name: "Work",
    members: ["You", "Diana"],
    balance: 12.25,
    type: "owed" as const,
  },
];

export function GroupsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your groups</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New group
        </Button>
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <Card
            key={group.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-gray-500">
                      {group.members.length} members
                    </div>
                    <div className="flex -space-x-2 mt-1">
                      {group.members.slice(0, 3).map((member) => (
                        <Avatar
                          key={member}
                          className="h-6 w-6 border-2 border-white"
                        >
                          <AvatarImage
                            src={`/placeholder.svg?height=24&width=24&text=${member[0]}`}
                          />
                          <AvatarFallback className="text-xs">
                            {member[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 3 && (
                        <div className="h-6 w-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            +{group.members.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {group.type === "settled" ? (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-600"
                    >
                      Settled up
                    </Badge>
                  ) : (
                    <>
                      <div
                        className={`font-semibold ${
                          group.type === "owed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ${group.balance.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {group.type === "owed" ? "you are owed" : "you owe"}
                      </div>
                    </>
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
