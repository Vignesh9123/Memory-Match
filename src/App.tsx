import { useState } from "react"
import Game from "./pages/Game"
import {motion} from "framer-motion"
function App() {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null)
  return (
    <>
   {!difficulty && <div className="w-full h-screen overflow-auto bg-slate-900">
      <motion.div
        initial={{opacity:0, filter:"blur(5px)"}}
        animate={{opacity:1, filter:"blur(0px)"}}
        
        transition={{duration:0.5}}
        className="text-xl md:text-3xl lg:text-6xl font-bold text-center text-white py-10 animate-pulse"
      >
        Welcome to Memory Match with AI
      </motion.div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-10 h-[80%] gap-6 justify-self-center items-center">
      {["Easy", "Medium", "Hard"].map((difficulty, index) => 
      
        <motion.div onClick={() => setDifficulty(difficulty.toLowerCase() as "easy" | "medium" | "hard")} initial={{opacity:0, y:100, filter:"blur(5px)"}} animate={{opacity:1, y:0, filter:"blur(0px)"}} transition={{duration:0.5, delay:index*0.2}} className={"w-full h-[100px] md:h-[300px] flex justify-center items-center border border-gray-400 rounded-md text-2xl font-bold cursor-pointer duration-150 hover:scale-105"+(index == 1?" bg-yellow-300 hover:bg-yellow-400":index == 2?" bg-red-300 hover:bg-red-400":" bg-green-300 hover:bg-green-400")}>
          {difficulty}{difficulty == "Hard" && " (Impossible)"}
        </motion.div>
        )}
       
     </div>
    </div>}
    {
      difficulty && <Game difficulty={difficulty} />
    }
    </>
  )
}

export default App
