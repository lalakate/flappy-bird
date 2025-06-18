import '../styles/start-game.css'
import titleImage from '../res/title.png'
import playButton from '../res/PlayButton.png'

const StartGame = ({ startGame }) => {
    return (
        <div className="start-game-container">
            <img src={titleImage} alt="game-title" className="title"/>
            <button onClick={startGame} className="start-game-button" style={{backgroundImage: `url(${playButton})`, backgroundSize: 'contain'}}/>
        </div>
    )
}

export default StartGame