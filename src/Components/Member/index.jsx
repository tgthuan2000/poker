import React, { useState } from 'react'
import './index.css'

export default function Member({ name, optionClick, color }) {
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    return (
        <div className='member'>
            <div className='member-avatar' style={{background:avatarBackground, color:textColor}}>{name[0]}</div>
            <h4 className='member-name' style={{color:textColor}}>{name}</h4>
            { optionClick &&
                <span className='member-option' style={{color:textColor}} onClick={optionClick}><i className="fas fa-ellipsis-v"></i></span>
            }
        </div>
    )
}

export const MemberModal = ({ name, onClick, color }) => {
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    const [check, setCheck] = useState(false)
    const click = () => {
        setCheck(!check);
        onClick()
    }
    return (
        <div className={`member member-modal${check ? ' member-checked' : '' }`} onClick={click}>
            <div className='member-avatar' style={{background:avatarBackground, color:textColor}}>{name[0]}</div>
            <h4 className='member-name' style={{color:textColor}}>{name}</h4>
            {check &&
                <i className="fas fa-check member-icon"></i>
            }
        </div>
    )
}