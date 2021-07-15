import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import './index.css'

export default function Member({ children, name, color, outline, modal }) {
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    const borderColor = `hsl(${color}, 100%, 50%)`
    return (
        <div className={`member${outline ? ' member-outline' : ''}${modal ? ' member-modal' : ''}`}>
            <div className='member-avatar' style={{background:avatarBackground, color:textColor, border:`1px solid ${borderColor}`}}>{name[0]}</div>
            <h4 className='member-name' style={{color:textColor}}>{name}</h4>
            {children}
        </div>
    )
}

export function MemberShowPoint({ name, color, outline, point}) {
    return (
        <Member  name={name} color={color} outline={outline}>
            <span className="score" style={{color: point > 0 ? 'green' : point < 0 ? 'red' : '#888'}}>{point}</span>
        </Member>
    )
}

export function MemberOption({ name, color, outline, optionClick }) {
    return (
        <Member  name={name} color={color} outline={outline}>
            <span className='member-option' style={{color:`hsl(${color}, 100%, 30%)`}} onClick={optionClick}>
                <i className="fas fa-ellipsis-v"></i>
            </span>
        </Member>
    )
}


export function MemberSetPoint({ name, color, outline, currentPoint, pointValue, id, index, modal }) {
    const [point, setPoint] = useState(0)
    useEffect(() => {
        setPoint(currentPoint)
    }, [currentPoint])
    return (
        <Member name={name} color={color} outline={outline} modal={modal}>
            <div className="member-point">
                <Button active icon='fas fa-minus' onClick={() => {setPoint(point - 1); pointValue(id, index, point - 1)}}/>
                <span className="point" style={{color: point > 0 ? 'green' : point < 0 ? 'red' : '#888'}}>{point}</span>
                <Button active icon='fas fa-plus' onClick={() => {setPoint(point + 1); pointValue(id, index, point + 1)}}/>
            </div>
        </Member>
    )
}

export const MemberModal = ({ name, onClick, color }) => {
    const avatarBackground = `hsl(${color}, 100%, 85%)`
    const textColor = `hsl(${color}, 100%, 30%)`
    const borderColor = `hsl(${color}, 100%, 50%)`
    const [click, setClick] = useState(false)
    return (
        <div className={`member member-outline member-modal${click ? ' member-checked' : '' }`} onClick={() => {setClick(!click); onClick()}}>
            <div className='member-avatar' style={{background:avatarBackground, color:textColor, border:`1px solid ${borderColor}`}}>{name[0]}</div>
            <h4 className='member-name' style={{color:textColor}}>{name}</h4>
            {click &&
                <i className="fas fa-check member-icon"></i>
            }
        </div>
    )
}