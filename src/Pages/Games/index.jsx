import React from 'react'
import { useState } from 'react';
import { gameData } from '../../Data';
import './index.css'
import { Link } from 'react-router-dom'

const Games = () =>  {
    // Nhận dữ liệu từ localStorage và truyền vào state
    const [gameList] = useState(gameData);
    const games = gameList.map( game =>
        <li className="game-item" key={game.id}>
            <Link to={`/games/${game.id}`} className='game-link'>
                <img className='game-img' src={`./img/${game.iconImage}`} alt=' ' />
                <span className="game-title">{game.name}</span>
            </Link>
        </li>
    )
    return (
        <div className='Games'>
            <ul className='game-list'>
                {games}
            </ul>
        </div>
    )
}

export default Games