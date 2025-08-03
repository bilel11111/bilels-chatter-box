import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Player = "X" | "O" | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (newBoard: Player[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setGameOver(false);
  };

  const renderCell = (index: number) => {
    const value = board[index];
    return (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        className="aspect-square bg-card hover:bg-accent border border-border rounded-lg text-2xl font-bold text-foreground transition-colors disabled:cursor-not-allowed"
        disabled={!!value || gameOver}
      >
        {value && (
          <span className={value === "X" ? "text-primary" : "text-destructive"}>
            {value}
          </span>
        )}
      </button>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Tic Tac Toe</CardTitle>
        <div className="flex items-center justify-center gap-4">
          {!gameOver && !winner && (
            <Badge variant="outline" className="text-lg">
              Current: <span className={`ml-1 ${currentPlayer === "X" ? "text-primary" : "text-destructive"}`}>
                {currentPlayer}
              </span>
            </Badge>
          )}
          {winner && (
            <Badge variant="default" className="text-lg">
              Winner: <span className="ml-1">{winner}</span>
            </Badge>
          )}
          {gameOver && !winner && (
            <Badge variant="secondary" className="text-lg">
              It's a Draw!
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 aspect-square">
          {Array.from({ length: 9 }, (_, index) => renderCell(index))}
        </div>
        <Button 
          onClick={resetGame}
          className="w-full"
          variant="outline"
        >
          New Game
        </Button>
      </CardContent>
    </Card>
  );
};

export default TicTacToe;