import pipeUp from '../res/PipeUp.png'
import '../styles/pipe.css'

const Pipe = ({ x, topHeight, bottomHeight }) => {
    const pipeWidth = 80

    return (
        <>
            <div style={{
                backgroundImage: `url(${pipeUp})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                left: x,
                width: pipeWidth,
                height: topHeight,
                top: 0,
                transform: 'scaleY(-1)',
                position: 'absolute'
            }}/>

            <div style={{
                backgroundImage: `url(${pipeUp})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                left: x,
                bottom: 167,
                width: pipeWidth,
                height: bottomHeight,
                position: 'absolute'
            }}/>
        </>
    )
}

export default Pipe