import Bird from "./components/Bird";
import Pipe from "./components/Pipe";
import StartGame from "./components/StartGame";
import GameOver from "./components/GameOver";
import GameLogic from "./GameLogic";
import './App.css'
import '../src/fonts/fonts.css'
import Background from "./components/Background";
import { useEffect } from "react";
import Score from "./components/Score";

const App = () => {
    const {
        gameStarted,
        gameOver,
        birdPosition,
        birdVelocity,
        currentFrame,
        pipes,
        score,
        handleJump,
        handleRestart
    } = GameLogic()

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space' || event.code === 'ArrowUp') {
                handleJump();
            }

            if (event.code === 'Enter' && gameOver) {
                handleJump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleJump]);

    console.log('gameOver:', gameOver);

    return (
        <div className="game-container" onClick={handleJump}>
            <Background/>
            {gameStarted && <Score score={score}/>}
            {pipes.map(pipe => (
                <Pipe 
                    key={pipe.id}
                    x={pipe.x}
                    topHeight={pipe.topHeight}
                    bottomHeight={pipe.bottomHeight}
                />
            ))}
            {(gameStarted || gameOver) ? (
                <Bird
                    position={birdPosition}
                    velocity={birdVelocity}
                    currentFrame={currentFrame}
                />
            ) : null}
            {!gameStarted && !gameOver && <StartGame startGame={handleJump} />}
            {gameOver && !gameStarted && <GameOver score={score} restart={handleRestart} />}
        </div>
    )
}

export default App