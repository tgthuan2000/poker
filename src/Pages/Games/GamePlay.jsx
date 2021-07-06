import React from 'react'
import './gamePlay.css'
import { useParams } from 'react-router'

const GamePlay = () =>  {
    let { gameId, roomId } = useParams()
    return (
        <div className='GamePlay'>
            game play {gameId + roomId}
        </div>
    )
}

export default GamePlay