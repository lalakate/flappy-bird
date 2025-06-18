import scoreBoard from '../res/Game-Over-Body.png'
import gameOverTitle from '../res/Game-Over-Title.png'
import '../styles/game-over.css'

const GameOver = ({score, restart}) => {
    return(
        <div className="game-over-container">
            <div className="game-over-title" style={{
                backgroundImage: `url(${gameOverTitle})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}/>
            <div className="score-board" style={{
                backgroundImage: `url(${scoreBoard})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}/>
            <div className="medal"/>
            <div className="score">{score}</div>
            <button onClick={restart} className="restart-button"></button>
        </div>
        )
}

export default GameOver