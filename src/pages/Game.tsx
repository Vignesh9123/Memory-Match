import { useState, useEffect } from 'react';
import { GameBoard } from '../components/GameBoard';
import { ScoreBoard } from '../components/ScoreBoard';
import { Card, GameState } from '../types/game';
import { createDeck, checkForMatch, computerMove } from '../utils/gameLogic';

function Game({difficulty}: {difficulty: "easy" | "medium" | "hard"}) {
  const [gameState, setGameState] = useState<GameState>({
    cards: createDeck(),
    players: [
      { name: 'Player', score: 0 },
      { name: 'Computer', score: 0, isComputer: true }
    ],
    currentPlayer: 0,
    selectedCards: [],
    gameOver: false,
    difficulty
  });

 const handleCardClick = (card: Card) => {
  if (gameState.selectedCards.length === 2 || card.isFlipped || card.isMatched) {
    return;
  }

  setGameState(prev => {
    const updatedCards = prev.cards.map(c =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );

    return {
      ...prev,
      cards: updatedCards,
      selectedCards: [...prev.selectedCards, card],
    };
  });
};


  useEffect(() => {
    if (gameState.selectedCards.length === 2) {

      const timeout = setTimeout(() => {
        const isMatch = checkForMatch(gameState.selectedCards);
        
        const updatedCards = gameState.cards.map(card => {
          const isSelected = gameState.selectedCards.some(c => c.id === card.id);
          return {
            ...card,
            isMatched: isMatch && isSelected ? true : card.isMatched,
            isFlipped: isMatch && isSelected ? true : !isSelected ? card.isFlipped : false
          };
        });

        // Update scores
        const updatedPlayers = [...gameState.players];
        if (isMatch) {
          updatedPlayers[gameState.currentPlayer].score += 1;
        }
        setGameState(prev => ({
          ...prev,
          cards: updatedCards,
          players: updatedPlayers as [typeof prev.players[0], typeof prev.players[1]],
          currentPlayer: isMatch ? prev.currentPlayer : (prev.currentPlayer + 1) % 2,
          selectedCards: [],
          gameOver: updatedCards.every(card => card.isMatched)
        }));
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [gameState.selectedCards]);

  useEffect(() => {
    if (gameState.currentPlayer === 1 && !gameState.gameOver && gameState.selectedCards.length === 0) {
      const timeout1 = setTimeout(() => {
        const [firstCardIndex, secondCardIndex] = computerMove(gameState);
        
        const firstCard = gameState.cards[firstCardIndex];
        handleCardClick(firstCard);
        
        const timeout2 = setTimeout(() => {
          const secondCard = gameState.cards[secondCardIndex];
          handleCardClick(secondCard);
        }, 500);

        return () => clearTimeout(timeout2);
      }, 1000);

      return () => clearTimeout(timeout1);
    }
  }, [gameState]);
  

  return (
    <div className="min-h-screen bg-gray-900 py-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-3xl font-bold text-center mb-4 text-gray-100">
          Memory Match Game
        </h1>
        
        <ScoreBoard
          players={gameState.players}
          currentPlayer={gameState.currentPlayer}
        />

        <div className="bg-white rounded-lg shadow-xl p-3">
          <GameBoard
            cards={gameState.cards}
            onCardClick={handleCardClick}
            disabled={gameState.currentPlayer === 1}
          />
        </div>

        {gameState.gameOver && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-100">
              Game Over!
            </h2>
            <p className="text-xl mt-2 text-white">
              {gameState.players[0].score > gameState.players[1].score
                ? 'You win! 🎉'
                : gameState.players[0].score < gameState.players[1].score
                ? 'Computer wins! 🤖'
                : "It's a tie! 🤝"}
            </p>
            <button
              onClick={() => setGameState({
                cards: createDeck(),
                players: [
                  { name: 'Player', score: 0 },
                  { name: 'Computer', score: 0, isComputer: true }
                ],
                currentPlayer: 0,
                selectedCards: [],
                gameOver: false,
                difficulty
              })}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;