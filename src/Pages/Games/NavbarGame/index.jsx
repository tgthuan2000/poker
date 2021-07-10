import React from 'react'
import './index.css'
import { gameData } from '../../../Data'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

const NavbarGame = () => {
    const localtion = useLocation()
    const gameId = localtion.pathname.split('/')[2];
    const game = gameData.find(item => item.id === gameId)

    return (
        <div className='navGame'>
            <Link to='../../../games' className="navGame-center">
                <img src={`../../../img/${game.iconImage}`} alt=" "/>
                <span>{game.name}</span>
            </Link>
            <Link to={`../../${gameId}`} className="navGame-left">
                <i className="fas fa-arrow-left"></i>
                <span>Room</span>
            </Link>
        </div>
    )
}

export default NavbarGame
