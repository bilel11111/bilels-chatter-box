import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowLeft } from "lucide-react";

export const Navigation = () => {
  return (
    <div className="absolute top-4 left-4 z-10">
      <Link to="/">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Chat
        </Button>
      </Link>
    </div>
  );
};