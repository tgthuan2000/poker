import React from 'react'
import './index.css'
import { gameData, setLocalStorage } from '../../../Data'
import { Link } from 'react-router-dom'
import { useLocation, useParams } from 'react-router'

const NavbarGame = () => {
    const { slug } = useParams()
    const localtion = useLocation()
    const gameId = localtion.pathname.split('/')[2];
    const game = gameData.find(item => item.id === gameId)
    const refreshNowLocalStorage = () => {
        setLocalStorage('nowData', {})
    }


    return (
        <div className={`navGame ${slug === 'home' ? 'active' : ''}`}>
            <Link to='../../../games' className="navGame-left" onClick={refreshNowLocalStorage}>
                <img src={`../../../img/${game.iconImage}`} alt=" "/>
                <span>{game.name}</span>
            </Link>
            <Link to={`../../${gameId}`} className="navGame-right" onClick={refreshNowLocalStorage}>
                <i className="fas fa-arrow-left"></i>
                <span>Room</span>
            </Link>
        </div>
    )
}

export default NavbarGame
