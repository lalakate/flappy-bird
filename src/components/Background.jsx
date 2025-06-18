import background from '../res/background.png'
import '../styles/background.css'

const Background = () => {
    return (
        <div className='background'>
            <img src={background} alt='background'className='background-image'/>
        </div>
    )
}

export default Background