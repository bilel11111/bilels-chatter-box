import { useState } from "react";
import { ChatLayout } from "@/components/chat/ChatLayout";
import Games from "./Games";
import Quotes from "./Quotes";
import Navigation from "@/components/layout/Navigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"chat" | "games" | "quotes">("chat");

  const renderSection = () => {
    switch (activeSection) {
      case "chat":
        return <ChatLayout />;
      case "games":
        return <Games />;
      case "quotes":
        return <Quotes />;
      default:
        return <ChatLayout />;
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-64 p-4 bg-background border-r border-border">
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
      </div>
      <div className="flex-1">
        {renderSection()}
      </div>
    </div>
  );
};

export default Index;
