import { useRef, useEffect, useState } from "react"

const GameLogic = () => {
    const gravity = 0.5
    const jumpForce = -10
    const pipeSpeed = 4
    const pipeGap = 250
    const gameHeight = 925
    const groundHeight = 136
    const gameWidth = 1280

    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [birdPosition, setBirdPosition] = useState(200)
    const birdPositionRef = useRef(birdPosition);
    const [birdVelocity, setBirdVelocity] = useState(0)
    const [pipes, setPipes] = useState([])
    const [score, setScore] = useState(0)
    const [currentFrame, setCurrentFrame] = useState(0)
    const passedPipesRef = useRef(new Set())

    const handleJump = () => {
        if(!gameStarted || gameOver) {
            setGameStarted(true)
            setGameOver(false)
            setBirdPosition(gameHeight / 2)
            setBirdVelocity(0)
            setPipes([])
            setScore(0)
            setCurrentFrame(0)
            return
        }

        setBirdVelocity(jumpForce)
    }

    const handleRestart = () => {
        setGameStarted(false)
        setGameOver(false)
        setBirdPosition(gameHeight / 2) 
        setBirdVelocity(0)
        setPipes([])
        setScore(0)
        setCurrentFrame(0)
        passedPipesRef.current.clear()
    }

    // Синхронизируем ref с состоянием
    useEffect(() => {
      birdPositionRef.current = birdPosition;
    }, [birdPosition]);

    useEffect(() => {
        if(!gameStarted || gameOver) return

        const interval = setInterval(() => {
            setCurrentFrame(prev => (prev + 1) % 3)
        }, 100)

        return () => clearInterval(interval)
    }, [gameStarted, gameOver])

        useEffect(() => {
            if(!gameStarted || gameOver) return

            const pipeInterval = setInterval(() => {
                const minPipeHeight = 150;
                const maxTopHeight = gameHeight - groundHeight - pipeGap - minPipeHeight;
                const topHeight = Math.floor(Math.random() * (maxTopHeight - minPipeHeight)) + minPipeHeight;
                const bottomHeight = gameHeight - groundHeight - pipeGap - topHeight;

            setPipes(prev => [
                ...prev,
                {
                    id: Date.now(),
                    x: 1820,
                    topHeight: topHeight,
                    bottomHeight: bottomHeight
                }
            ])
        }, 1500)

        return () => clearInterval(pipeInterval)
    }, [gameStarted, gameOver])

    useEffect(() => {
        const pipeWidth = 80; // или то значение, что вы используете для ширины пайпа
        
        if (!gameStarted || gameOver) return;
        
        const gameLoop = setInterval(() => {
            setBirdPosition(prev => {
                const newPosition = prev + birdVelocity;
                if (newPosition >= gameHeight - 30 - groundHeight || newPosition < 0) {
                    setGameOver(true);
                    return prev;
                }
                return newPosition;
            });
            
            setBirdVelocity(prev => prev + gravity);
            
            
            setPipes(prevPipes => {
                const updatedPipes = prevPipes.map(pipe => {
                    const birdWidth = 50;
                    const birdX = (gameWidth / 2) - (birdWidth / 2);
                    const newX = pipe.x - pipeSpeed;

                    if (newX + pipeWidth < birdX && !passedPipesRef.current.has(pipe.id)) {
                        console.log(`${pipe.id}`)
                        setScore(prev => prev + 1);
                        passedPipesRef.current.add(pipe.id)
                    }

                    return {
                        ...pipe,
                        x: newX
                    };
                }).filter(pipe => pipe.x > -pipeWidth);

                // Проверка столкновений
                const birdWidth = 50;
                const birdHeight = 50;
                const birdPadding = 10; // уменьшает "чувствительность" столкновения
                const pipePadding = 3;

                const birdX = (gameWidth / 2) - (birdWidth / 2);
                const birdY = birdPositionRef.current;
                const gameBottom = gameHeight - groundHeight;

                for (const pipe of updatedPipes) {
                    const pipeX = pipe.x;
                    const topPipeBottom = pipe.topHeight;
                    const bottomPipeTop = gameHeight - groundHeight - pipe.bottomHeight;

                    const collide =
                        birdX + birdPadding < pipeX + pipeWidth - pipePadding &&
                        birdX + birdWidth - birdPadding > pipeX + pipePadding &&
                        (
                            birdY + birdPadding < topPipeBottom ||
                            birdY + birdHeight - birdPadding > bottomPipeTop
                        );

                    if (collide) {
                        setGameOver(true);
                        break;
                    }
                }

                return updatedPipes;
            });
        }, 16);

        return () => clearInterval(gameLoop);
    }, [birdPosition, birdVelocity, gameStarted, gameOver]);

    return {
        gameStarted,
        gameOver,
        birdPosition,
        birdVelocity,
        currentFrame,
        pipes,
        score,
        handleJump,
        handleRestart
    }
}

export default GameLogic