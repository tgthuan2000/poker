import React, { useEffect } from 'react'
import './index.css'
import { useLocation, useParams } from 'react-router'
import { pokerConfig, setLocalStorage } from '../../../Data'
import { Link } from 'react-router-dom'
import Home from './Home'
import History from './History'
import MemberConfig from './MemberConfig'
import Gameplay from './Gameplay'
import {getLocalStorage} from '../../../Data'
import PageEmpty from '../../../Components/PageEmpty'

const Poker = () =>  {
    const localtion =  useLocation()
    const { roomId, slug } = useParams()
    const KEY_GAME = 'poker'
    const indexRoom = getLocalStorage(KEY_GAME).findIndex(item => item['room-id'] === roomId)
    const currentRoom = getLocalStorage(KEY_GAME)[indexRoom]
    useEffect(() => {
        if(currentRoom['room-active'])
            setLocalStorage('nowData', {status: true, link: localtion.pathname})
        else
            setLocalStorage('nowData', {})
    })
    const navbar = currentRoom['room-active'] ?
        pokerConfig.navbar.map((item, index) => 
            <Link to={`./${item.link}`} className={`poker-nav-link${slug === item.link ? ' active' : ''}`} key={index}>
                <i className={item.icon}></i>
            </Link>
        )
        :
        pokerConfig.navbar.filter(x => x.block).map((item, index) => 
            <Link to={`./${item.link}`} className={`poker-nav-link${slug === item.link ? ' active' : ''}`} key={index}>
                <i className={item.icon}></i>
            </Link>
        )
    return (
        <div className='poker'>
            <div className='poker-nav'>
                {navbar}
            </div>
            <div className="poker-wrap">
                {slug === 'home' ?
                    <Home
                        gameId={KEY_GAME}
                        currentRoom={currentRoom}
                        indexRoom={indexRoom}
                    />
                :
                slug === 'history' ?
                    <History
                        gameId={KEY_GAME}
                        currentRoom={currentRoom}
                        indexRoom={indexRoom}
                    />
                :
                slug === 'member-config' && currentRoom['room-active'] ?
                    <MemberConfig 
                        gameId={KEY_GAME}
                        currentRoom={currentRoom}
                        indexRoom={indexRoom}
                    />
                :
                slug === 'gameplay' && currentRoom['room-active'] ?
                    <Gameplay
                        gameId={KEY_GAME}
                        currentRoom={currentRoom}
                        indexRoom={indexRoom}
                    />
                :
                <PageEmpty
                    height='calc(100vh - 80px)'
                    img='../../../img/error-404.png'
                />
                }
            </div>
        </div>
    )
}

export const PokerHeader = ({ headerText, children }) => (
    <div className="poker-header">
        <h4> {headerText} </h4>
        <div className="poker-header-wrap">
            {children}
        </div>
    </div>
)

export const PokerBody = ({children}) => (
    <div className="poker-body">
        {children}
    </div>
)

export const PokerDesc = ({children}) => (
    <div className="poker-description">
        {children}
    </div>
)
export const PokerConfig = ({ text, icon, onClick, active }) => (
    <div className="poker-config">
        <span> {text} </span>
        {active &&
            <div className="poker-config-wrap">
                <i className={icon} onClick={onClick}></i>
            </div>
        }
    </div>
)

export default Poker