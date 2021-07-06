import React from 'react'
import './gameRoom.css'
import { useParams } from 'react-router'

const GameRooms = () =>  {
    let { gameId } = useParams()
    return (
        <div className='GameRooms'>
            game room {gameId}
        </div>
    )
}

export default GameRooms