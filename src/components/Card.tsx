import React from 'react';
import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled:boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={card.isMatched || card.isFlipped || disabled}
      className={`
        w-24 h-24 m-2 rounded-lg text-4xl
        transition-all duration-300 transform
        ${(card.isFlipped || card.isMatched)
          ? 'bg-white rotate-0'
          : 'bg-indigo-600 rotate-y-180'}
        ${(!card.isMatched && !card.isFlipped )? 'hover:bg-indigo-500 cursor-pointer' : ''}
        flex items-center justify-center
        shadow-lg
      `}
    >
      {(card.isFlipped || card.isMatched) && card.value}
    </button>
  );
};