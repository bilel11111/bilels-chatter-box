import { useState } from "react";
import GamesList from "@/components/games/GamesList";
import TicTacToe from "@/components/games/TicTacToe";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleBackToList = () => {
    setSelectedGame(null);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "tic-tac-toe":
        return <TicTacToe />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gradient-chat p-4">
      <div className="max-w-6xl mx-auto">
        {selectedGame ? (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={handleBackToList}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Games
            </Button>
            {renderGame()}
          </div>
        ) : (
          <GamesList onGameSelect={handleGameSelect} />
        )}
      </div>
    </div>
  );
};

export default Games;