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
      isComputerSeen: false
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
//
export const computerMove = (gameState: GameState): [number, number] => {
  if(gameState.difficulty == "hard"){
  const knownMatch = findKnownMatch(gameState.cards);
  if (knownMatch) {
    console.log('Found known match:', knownMatch);
    return knownMatch;
  }

  const availableCards = gameState.cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => !card.isMatched && !card.isFlipped);

  // Try to find a card that the computer has seen before
  const seenCards = availableCards.filter(({ card }) => card.isComputerSeen);
  if (seenCards.length > 0) {
    for (let i = 0; i < seenCards.length - 1; i++) {
      for (let j = i + 1; j < availableCards.length; j++) {
        if (seenCards[i].card.value === availableCards[j].card.value && i !== j && seenCards[i].index !== availableCards[j].index) {
          console.log('Found two cards with known match:', seenCards[i].index, availableCards[j].index);
          return [availableCards[j].index, seenCards[i].index];
        }
      }
    }
  }

  // If no known match is found, pick two random cards
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  gameState.cards[shuffled[0].index].isComputerSeen = true;
  gameState.cards[shuffled[1].index].isComputerSeen = true;
  console.log('Picked two random cards:', shuffled);
  return [shuffled[0].index, shuffled[1].index];
  }
  else if(gameState.difficulty == "medium"){
    const availableCards = gameState.cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => !card.isMatched && !card.isFlipped);

  // Try to find a card that the computer has seen before
  const seenCards = availableCards.filter(({ card }) => card.isComputerSeen);
  if (seenCards.length > 0) {
    for (let i = 0; i < seenCards.length - 1; i++) {
      for (let j = i + 1; j < availableCards.length; j++) {
        if (seenCards[i].card.value === availableCards[j].card.value && i !== j && seenCards[i].index !== availableCards[j].index) {
          console.log('Found two cards with known match:', seenCards[i].index, availableCards[j].index);
          return [availableCards[j].index, seenCards[i].index];
        }
      }
    }
  }

  // If no known match is found, pick two random cards
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  gameState.cards[shuffled[0].index].isComputerSeen = true;
  gameState.cards[shuffled[1].index].isComputerSeen = true;
  console.log('Picked two random cards:', shuffled);
  return [shuffled[0].index, shuffled[1].index];
  }
  else {
    const availableCards = gameState.cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => !card.isMatched && !card.isFlipped);
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  gameState.cards[shuffled[0].index].isComputerSeen = true;
  gameState.cards[shuffled[1].index].isComputerSeen = true;
  console.log('Picked two random cards:', shuffled);
  return [shuffled[0].index, shuffled[1].index];
  }
}; 