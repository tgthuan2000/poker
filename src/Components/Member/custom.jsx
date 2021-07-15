import React from 'react'
import './custom.css'


export default function CustomMember ({ optionClick, name, color, outline, modal }) {
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    const borderColor = `hsl(${color}, 100%, 50%)`
    return (
        <div className={`member-custom${outline ? ' member-custom-outline' : ''}${modal ? ' member-custom-modal' : ''}`} style={{borderImage: `url(./frames/rose.png) 30% round`}}>
            <div className='member-custom-avatar' style={{background:avatarBackground, color:textColor, border:`1px solid ${borderColor}`}}>{name[0]}</div>
            <h4 className='member-custom-name' style={{color:textColor}}>{name}</h4>
            <span className='member-custom-option' style={{color:`hsl(${color}, 100%, 30%)`}} onClick={optionClick}>
                <i className="fas fa-ellipsis-v"></i>
            </span>
            <div className="member-custom-awards" style={{borderImage: `url(./frames/rose.png) 20% round`}}>
                <span className="member-custom-awards-name">Initial Member</span>
            </div>
        </div>
    )
}