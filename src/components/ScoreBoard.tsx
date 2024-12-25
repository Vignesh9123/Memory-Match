import React from 'react';
import { Player } from '../types/game';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  players: [Player, Player];
  currentPlayer: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, currentPlayer }) => {
  return (
    <div className="flex justify-center gap-8 mb-8">
      {players.map((player, index) => (
        <div
          key={player.name}
          className={`p-4 rounded-lg ${
            currentPlayer === index
              ? 'bg-indigo-100 border-2 border-indigo-500'
              : 'bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2">
            {player.isComputer ? '🤖' : '👤'}
            <span className="font-semibold">{player.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Trophy size={16} />
            <span>{player.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
};