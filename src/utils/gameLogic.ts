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

//Core Computer moves logic
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
          console.log('Found two cards with known match:', [seenCards[i], availableCards[j]]);
          return [availableCards[j].index, seenCards[i].index];
        }
      }
    }
  }

  // If no known match is found, pick two random cards
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  gameState.cards[shuffled[0].index].isComputerSeen = true;
  gameState.cards[shuffled[1].index].isComputerSeen = true;
  console.log('Picked two random cards:', [shuffled[0], shuffled[1]]);
  return [shuffled[0].index, shuffled[1].index];
  }
  else if(gameState.difficulty == "medium"){
    const availableCards = gameState.cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => !card.isMatched && !card.isFlipped);

  // Try to find two cards with same value that the computer has seen before
  const seenCards = availableCards.filter(({ card }) => card.isComputerSeen);
  if (seenCards.length > 0) {
    console.log('Computer seen cards', seenCards)
    for (let i = 0; i <= seenCards.length - 1; i++) {
      for (let j = i + 1; j <= seenCards.length - 1; j++) {
        console.log('Computer trying to match',seenCards[i].card.value, seenCards[j].card.value)
        if (seenCards[i].card.value === seenCards[j].card.value  && seenCards[i].index !== seenCards[j].index) {
          console.log('Found two cards with known match:', [seenCards[i], seenCards[j]]);
          return [seenCards[j].index, seenCards[i].index];
        }
      }
    }
  }

  // If no known match is found, pick one random cards
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  gameState.cards[shuffled[0].index].isComputerSeen = true;

  // Check for match with the first picked card and already seen cards
  const availableCards2 = gameState.cards
  .map((card, index) => ({ card, index }))
  .filter(({ card }) => !card.isMatched && !card.isFlipped);
  const seenCards2 = availableCards2.filter(({ card }) => card.isComputerSeen);
  if (seenCards2.length > 0) {
    console.log('Computer seen cards 2', seenCards2)
    for (let i = 0; i <= seenCards2.length - 1; i++) {
      for (let j = i + 1; j <= seenCards2.length - 1; j++) {
        console.log('Computer trying to match 2',seenCards2[i].card.value, seenCards2[j].card.value)
        if (seenCards2[i].card.value === seenCards2[j].card.value  && seenCards2[i].index !== seenCards2[j].index) {
          console.log('Found two cards2 with known match:', [seenCards2[i], seenCards2[j]]);
          return [seenCards2[j].index, seenCards2[i].index];
        }
      }
    }
  }
  // If no known match is found, pick two random cards
    gameState.cards[shuffled[1].index].isComputerSeen = true;
    console.log('Picked two random cards:', [shuffled[0], shuffled[1]]);
    return [shuffled[0].index, shuffled[1].index];
  }
  else {
    const availableCards = gameState.cards
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => !card.isMatched && !card.isFlipped);
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  gameState.cards[shuffled[0].index].isComputerSeen = true;
  gameState.cards[shuffled[1].index].isComputerSeen = true;
  console.log('Picked two random cards:', [shuffled[0], shuffled[1]]);
  return [shuffled[0].index, shuffled[1].index];
  }
}; 