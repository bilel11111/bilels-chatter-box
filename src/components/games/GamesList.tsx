import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GamepadIcon, Users } from "lucide-react";

interface Game {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  component: string;
}

interface GamesListProps {
  onGameSelect: (gameId: string) => void;
}

const availableGames: Game[] = [
  {
    id: "tic-tac-toe",
    name: "Tic Tac Toe",
    description: "Classic 3x3 grid game. Get three in a row to win!",
    minPlayers: 2,
    maxPlayers: 2,
    component: "TicTacToe"
  }
];

const GamesList = ({ onGameSelect }: GamesListProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Games</h1>
        <p className="text-muted-foreground">Choose a game to play</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableGames.map((game) => (
          <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GamepadIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{game.name}</CardTitle>
              </div>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {game.minPlayers === game.maxPlayers 
                    ? `${game.minPlayers} players`
                    : `${game.minPlayers}-${game.maxPlayers} players`
                  }
                </span>
              </div>
              <Button 
                onClick={() => onGameSelect(game.id)}
                className="w-full"
              >
                Play Game
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GamesList;