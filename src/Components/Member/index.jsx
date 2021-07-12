import React, { useState } from 'react'
import { Button } from '../Button'
import './index.css'

export default function Member({ id, index, pointValue, name, optionClick, color, outline, pointClick }) {
    const [point, setPoint] = useState(0)
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    const borderColor = `hsl(${color}, 100%, 50%)`
    return (
        <div className={`member${outline ? ' outline' : ''}`}>
            <div className='member-avatar' style={{background:avatarBackground, color:textColor, border:`1px solid ${borderColor}`}}>{name[0]}</div>
            <h4 className='member-name' style={{color:textColor}}>{name}</h4>
            { optionClick &&
                <span className='member-option' style={{color:textColor}} onClick={optionClick}><i className="fas fa-ellipsis-v"></i></span>
            }
            {pointClick &&
                <div className="member-point">
                    <Button active icon='fas fa-minus' onClick={() => {setPoint(point - 1); pointValue(id, index, point - 1)}}/>
                    <span className="point" style={{color: point > 0 ? 'green' : point < 0 ? 'red' : '#888'}}>{point}</span>
                    <Button active icon='fas fa-plus' onClick={() => {setPoint(point + 1); pointValue(id, index, point + 1)}}/>
                </div>
            }
        </div>
    )
}

export const MemberModal = ({ name, onClick, color }) => {
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    const borderColor = `hsl(${color}, 100%, 50%)`
    const [click, setClick] = useState(false)
    return (
        <div className={`member outline member-modal${click ? ' member-checked' : '' }`} onClick={() => {setClick(!click); onClick()}}>
            <div className='member-avatar' style={{background:avatarBackground, color:textColor, border:`1px solid ${borderColor}`}}>{name[0]}</div>
            <h4 className='member-name' style={{color:textColor}}>{name}</h4>
            {click &&
                <i className="fas fa-check member-icon"></i>
            }
        </div>
    )
}