import { Card, GameState } from '../types/game';

const CARD_SYMBOLS = ['🌟', '🎨', '🎭', '🎪', '🎯', '🎲', '🎳', '🎮'];

export const createDeck = (): Card[] => {
  const symbols = [...CARD_SYMBOLS, ...CARD_SYMBOLS];
  return symbols
    .sort(() => Math.random() - 0.5)
    .map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
};

export const checkForMatch = (cards: Card[]): boolean => {
  return cards.length === 2 && cards[0].value === cards[1].value;
};

export const findKnownMatch = (cards: Card[]): [number, number] | null => {
  const seenCards = new Map<string, number[]>();
  
  cards.forEach((card, index) => {
    if (!card.isMatched && !card.isFlipped) {
      const indices = seenCards.get(card.value) || [];
      indices.push(index);
      seenCards.set(card.value, indices);
    }
  });

  for (const [_, indices] of seenCards) {
    if (indices.length >= 2) {
      return [indices[0], indices[1]];
    }
  }

  return null;
};

export const computerMove = (gameState: GameState): [number, number] => {
  // const knownMatch = findKnownMatch(gameState.cards);
  // if (knownMatch) {
  //   return knownMatch;
  // }

  const availableCards = gameState.cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => !card.isMatched && !card.isFlipped);

  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  return [shuffled[0].index, shuffled[1].index];
};