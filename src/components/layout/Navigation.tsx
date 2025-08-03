import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, GamepadIcon, Quote } from "lucide-react";

interface NavigationProps {
  activeSection: "chat" | "games" | "quotes";
  onSectionChange: (section: "chat" | "games" | "quotes") => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navItems = [
    {
      id: "chat" as const,
      label: "Chat",
      icon: MessageCircle,
      description: "Real-time messaging"
    },
    {
      id: "games" as const,
      label: "Games",
      icon: GamepadIcon,
      description: "Play games together"
    },
    {
      id: "quotes" as const,
      label: "Quotes",
      icon: Quote,
      description: "Daily inspiration"
    }
  ];

  return (
    <Card className="p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start text-left ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              <div className="flex flex-col items-start">
                <span className="font-medium">{item.label}</span>
                <span className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {item.description}
                </span>
              </div>
            </Button>
          );
        })}
      </nav>
    </Card>
  );
};

export default Navigation;