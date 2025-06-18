import birdFrame1 from '../res/bird-01.png'
import birdFrame2 from '../res/bird-02.png'
import birdFrame3 from '../res/bird-03.png'
import '../styles/bird.css'

const Bird = ({position, velocity, currentFrame}) => {
    const birdFrames = [birdFrame1, birdFrame2, birdFrame3]
    const rotation = Math.min(25, Math.max(-25, velocity * 3))

    return (
        <div
            className="bird"
            style={{
                backgroundImage: `url(${birdFrames[currentFrame]})`,
                top: position,
                transform: `rotate(${rotation}deg)`,
                transition: 'top 0.1s linear, transform 0.2s ease-out'
            }}
        />
    )
}

export default Bird