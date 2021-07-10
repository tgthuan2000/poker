import React from 'react'
import './index.css'
import { useParams } from 'react-router'
import { pokerConfig } from '../../../Data'
import { Link } from 'react-router-dom'
import Home from './Home'
import History from './History'
import MemberConfig from './MemberConfig'
import Gameplay from './Gameplay'

const Poker = () =>  {
    const { slug } = useParams()
    // const KEY_GAME = 'poker'
    // const [data, setData] = useState([])
    // const indexRoom = getLocalStorage(KEY_GAME).findIndex(item => item['room-id'] === roomId)

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
                    <MemberConfig></MemberConfig>
                }
                {slug === 'gameplay' &&
                    <Gameplay></Gameplay>
                }
            </div>
        </div>
    )
}

export default Poker