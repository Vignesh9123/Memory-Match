import React from 'react';
import { Card as CardComponent } from './Card';
import { Card as CardType } from '../types/game';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  disabled:boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, disabled }) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-4 justify-items-center">
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          card={card}
          disabled={disabled}
          onClick={() => onCardClick(card)}

        />
      ))}
    </div>
  );
};