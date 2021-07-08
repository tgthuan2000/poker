import React from 'react'
import { gameData } from '../../Data';
import './index.css'
import { Link } from 'react-router-dom'

const Games = () =>  {
    const games = gameData.map( game =>
        <li className="game-item" key={game.id}>
            <Link to={`/games/${game.id}`} className='game-link'>
                <img className='game-img' src={`./img/${game.iconImage}`} alt=' ' />
                <span className="game-title">{game.name}</span>
            </Link>
        </li>
    )
    return (
        <div className='game'>
            <ul className='game-list'>
                {games}
            </ul>
        </div>
    )
}

export default Games