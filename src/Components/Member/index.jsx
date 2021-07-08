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

export const MemberModal = ({ name, onClick, color, active }) => {
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    return (
        <div className={`member member-modal${active ? ' member-checked' : '' }`} onClick={onClick}>
            <div className='member-avatar' style={{background:avatarBackground, color:textColor}}>{name[0]}</div>
            <h4 className='member-name' style={{color:textColor}}>{name}</h4>
            {active &&
                <i className="fas fa-check member-icon"></i>
            }
        </div>
    )
}