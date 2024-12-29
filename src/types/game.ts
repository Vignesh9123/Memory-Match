export type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  isComputerSeen?: boolean;
};

export type Player = {
  name: string;
  score: number;
  isComputer?: boolean;
};

export type GameState = {
  cards: Card[];
  players: [Player, Player];
  currentPlayer: number;
  selectedCards: Card[];
  gameOver: boolean;
  difficulty:"easy" | "medium" | "hard";
};