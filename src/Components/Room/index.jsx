import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Room = ({ name, length, link, createAt, active, members }) => {
    return (
        <Link to={link} className={`room${active ? ' active' : ''}`}>
            <div className="room-wrapper">
                <h4 className="room-create-at">{createAt}</h4>
                <b className="room-status">{active ? 'Active' : 'Block'}</b>
            </div>
            <div className="room-wrapper">
                <span>{length} members</span>
                <span>{name}</span>
            </div>
            {!active && 
                members.map((item, index) =>
                    <div className="room-wrapper" key={index}>
                        <span style={{color:`hsl(${item.color}, 80%, 50%)`}}>
                            <img src={`../../img/top-${index+1}.png`} alt=" "/> 
                            {item.name}
                        </span>
                        <span style={{color:`hsl(${item.color}, 80%, 50%)`}}>{item.total} points</span>
                    </div>
                )
            }
        </Link>
    )
}

const ModalRoom = ({ name, length, onClick, active, createAt }) => {
    return (
        <div className={`room room-modal${active ? ' active' : ''}`} onClick={onClick}>
            <div className="room-wrapper">
                <h4 className="room-create-at">{createAt}</h4>
            </div>
            <div className="room-wrapper">
                <span>{length} members</span>
                <span>{name}</span>
            </div>
        </div>
    )
}


export { Room, ModalRoom }