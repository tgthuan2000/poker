import React from 'react'
import './index.css'
import { useParams } from 'react-router'
import { pokerConfig } from '../../../Data'
import { Link } from 'react-router-dom'
import Home from './Home'
import History from './History'
import MemberConfig from './MemberConfig'
import Gameplay from './Gameplay'
import {getLocalStorage} from '../../../Data'

const Poker = () =>  {
    const { roomId, slug } = useParams()
    const KEY_GAME = 'poker'
    const indexRoom = getLocalStorage(KEY_GAME).findIndex(item => item['room-id'] === roomId)
    const currentRoom = getLocalStorage(KEY_GAME)[indexRoom]

    const navbar = pokerConfig.navbar.map((item, index) => 
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
                {slug === 'home' &&
                    <Home></Home>
                }
                {slug === 'history' &&
                    <History></History>
                }
                {slug === 'member-config' &&
                    <MemberConfig 
                        gameId={KEY_GAME}
                        currentRoom={currentRoom}
                        indexRoom={indexRoom}
                    />
                }
                {slug === 'gameplay' &&
                    <Gameplay></Gameplay>
                }
            </div>
        </div>
    )
}

export default Poker