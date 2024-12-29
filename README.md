# Memory Match Game  

This project is a **Memory Match Game** built using **React**. It features a player-versus-computer mode where the computer uses an **AI algorithm** to make optimal moves. The game is designed to be simple, engaging, and showcases the integration of AI in casual gaming.

Live Link: [https://ai-memory-match.vercel.app](https://ai-memory-match.vercel.app)
---

## Features  

- **Player vs AI Mode**: Play against an AI-powered opponent.  
- **Memory Matching Gameplay**: Flip two cards at a time to find matching pairs.  
- **AI-Powered Moves**: The computer uses the **Minimax Algorithm** with memory optimization to simulate intelligent behavior.  
- **Responsive Design**: Optimized for both desktop and mobile.  

---
## How It Works  

### AI Algorithm: Minimax with Memory Optimization  

The AI uses the **Minimax Algorithm** to determine the best possible moves.  
- **Step 1**: Tracks flipped cards and their positions in memory.  
- **Step 2**: Predicts outcomes of card flips using the minimax strategy.  
- **Step 3**: Chooses moves to maximize its score while minimizing the player's chances of gaining points.  

This algorithm ensures the AI behaves intelligently, adapting to the player's moves over time.  

---

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/Vignesh9123/Memory-Match.git 
   ```  

2. Navigate to the project directory:  
   ```bash  
   cd Memory-Match
   ```  

3. Install dependencies:  
   ```bash  
   npm install  
   ```  

4. Start the development server:  
   ```bash  
   npm run dev  
   ```  

5. Open [http://localhost:5173](http://localhost:5173) in your browser to play.  

---

## Usage  

1. Select **One of three modes** (Easy, Medium or Hard).  
2. Flip two cards to find matching pairs.  
3. Watch the AI take its turn and strategize its moves.  
4. The game ends when all pairs are matched.  

---

## Technologies Used  

- **React**: Frontend framework.  
- **Tailwind CSS**: Styling and responsive design.  
- **Typescript**: Game logic and AI implementation.  

---
