import React, { useState, useEffect } from 'react'
import './gamePlay.css'
import { useParams } from 'react-router'
import Poker from './Poker'
import NavbarGame from './NavbarGame'
import { getLocalStorage } from '../../Data'

const GamePlay = () =>  {
    let { gameId, roomId } = useParams()
    const [data, setData] = useState([])
    const indexRoom = getLocalStorage(gameId).findIndex(item => item['room-id'] === roomId)

    useEffect(() => {
        switch (gameId) {
            case 'poker': setData(<Poker indexRoom={indexRoom} />)
                break;
            default:
                break;
        }
    }, [roomId, gameId, indexRoom])
    return (
        <div className='GamePlay'>
            <NavbarGame
                gameId={gameId}
                indexRoom={indexRoom}
            />
            <div className="game-zone">
                {data}
            </div>
        </div>
    )
}

export default GamePlay