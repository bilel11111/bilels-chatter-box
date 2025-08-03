import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';

interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

type ChessBoard = (ChessPiece | null)[][];

const initialBoard: ChessBoard = [
  [
    { type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, 
    { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }
  ],
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' } as ChessPiece)),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' } as ChessPiece)),
  [
    { type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, 
    { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }
  ]
];

const pieceSymbols: Record<PieceType, { white: string; black: string }> = {
  king: { white: '♔', black: '♚' },
  queen: { white: '♕', black: '♛' },
  rook: { white: '♖', black: '♜' },
  bishop: { white: '♗', black: '♝' },
  knight: { white: '♘', black: '♞' },
  pawn: { white: '♙', black: '♟' }
};

export const ChessGame = () => {
  const [board, setBoard] = useState<ChessBoard>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [capturedPieces, setCapturedPieces] = useState<{ white: ChessPiece[]; black: ChessPiece[] }>({
    white: [],
    black: []
  });
  const { toast } = useToast();

  const resetGame = () => {
    setBoard(initialBoard);
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setCapturedPieces({ white: [], black: [] });
    toast({
      title: "Game Reset",
      description: "A new chess game has started!",
    });
  };

  const isValidMove = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    const piece = board[fromRow][fromCol];
    if (!piece || piece.color !== currentPlayer) return false;
    
    // Basic validation - just check if destination is empty or has opponent piece
    const targetPiece = board[toRow][toCol];
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    return true;
  };

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      
      if (fromRow === row && fromCol === col) {
        setSelectedSquare(null);
        return;
      }

      if (isValidMove(fromRow, fromCol, row, col)) {
        const newBoard = board.map(r => [...r]);
        const movingPiece = newBoard[fromRow][fromCol];
        const capturedPiece = newBoard[row][col];
        
        if (capturedPiece) {
          setCapturedPieces(prev => ({
            ...prev,
            [currentPlayer]: [...prev[currentPlayer], capturedPiece]
          }));
        }
        
        newBoard[row][col] = movingPiece;
        newBoard[fromRow][fromCol] = null;
        
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        setSelectedSquare(null);
        
        toast({
          title: "Move Made",
          description: `${currentPlayer} moved ${movingPiece?.type}`,
        });
      } else {
        setSelectedSquare(null);
      }
    } else {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  };

  const renderSquare = (row: number, col: number) => {
    const piece = board[row][col];
    const isSelected = selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
    const isLight = (row + col) % 2 === 0;
    
    return (
      <button
        key={`${row}-${col}`}
        className={`
          w-12 h-12 flex items-center justify-center text-2xl font-bold transition-all
          ${isLight ? 'bg-amber-100' : 'bg-amber-800'}
          ${isSelected ? 'ring-4 ring-primary' : ''}
          hover:bg-opacity-80 border border-amber-900/20
        `}
        onClick={() => handleSquareClick(row, col)}
      >
        {piece && pieceSymbols[piece.type][piece.color]}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <div className="font-semibold">Current Turn: {currentPlayer}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-8 gap-0 border-2 border-amber-900 rounded-lg overflow-hidden">
          {board.map((row, rowIndex) =>
            row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="font-semibold mb-1">White Captured:</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.white.map((piece, index) => (
              <span key={index} className="text-lg">
                {pieceSymbols[piece.type][piece.color]}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-1">Black Captured:</div>
          <div className="flex flex-wrap gap-1">
            {capturedPieces.black.map((piece, index) => (
              <span key={index} className="text-lg">
                {pieceSymbols[piece.type][piece.color]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};