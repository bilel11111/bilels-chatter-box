import { ChatLayout } from "@/components/chat/ChatLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

const Index = () => {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/games">
          <Button variant="outline" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Games & Quotes
          </Button>
        </Link>
      </div>
      <ChatLayout />
    </div>
  );
};

export default Index;
