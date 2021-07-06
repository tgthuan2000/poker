import React from 'react'
import { useState } from 'react';
import { gameData } from '../../Data';
import './index.css'

const Games = () =>  {
    // Nhận dữ liệu từ localStorage và truyền vào state
    const [gameList] = useState(gameData);
    const games = gameList.map(item =>
        <li className="game-item" key={item.id}>
            <img className='game-img' src={`./img/${item.iconImage}`} alt='img' />
            <span className="game-title">{item.name}</span>
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