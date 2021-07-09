import React, { useState, useEffect } from 'react'
import './gamePlay.css'
import { useParams } from 'react-router'
import Poker from './Poker'
import NavbarGame from './NavbarGame'

const GamePlay = () =>  {
    let { gameId, roomId } = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        switch (gameId) {
            case 'poker': setData(<Poker roomId={roomId} />)
                break;
            default:
                break;
        }
    }, [])
    return (
        <div className='GamePlay'>
            <NavbarGame
                gameId={gameId}
                roomId={roomId}
            />
            {data}
        </div>
    )
}

export default GamePlay