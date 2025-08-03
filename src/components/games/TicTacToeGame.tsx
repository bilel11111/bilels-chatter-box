import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Player = 'X' | 'O' | null;

export const TicTacToeGame = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Player[]): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
    toast({
      title: "Game Reset",
      description: "A new game has started!",
    });
  };

  const handleClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      toast({
        title: "Game Over!",
        description: `Player ${gameWinner} wins!`,
      });
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
      toast({
        title: "Game Over!",
        description: "It's a tie!",
      });
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const renderSquare = (index: number) => {
    return (
      <button
        key={index}
        className={`
          w-20 h-20 border-2 border-primary/30 bg-background hover:bg-accent 
          text-3xl font-bold transition-all duration-200
          ${board[index] === 'X' ? 'text-blue-600' : 'text-red-600'}
          ${!board[index] && !gameOver ? 'hover:scale-105' : ''}
          disabled:cursor-not-allowed
        `}
        onClick={() => handleClick(index)}
        disabled={!!board[index] || gameOver}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {gameOver 
            ? winner 
              ? `🎉 Player ${winner} Wins!` 
              : "🤝 It's a Tie!"
            : `Player ${currentPlayer}'s Turn`
          }
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-1 p-4 bg-primary/5 rounded-lg">
          {board.map((_, index) => renderSquare(index))}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground space-y-1">
        <div>Player X: Blue</div>
        <div>Player O: Red</div>
      </div>
    </div>
  );
};