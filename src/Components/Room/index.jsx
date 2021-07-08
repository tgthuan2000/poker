import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Room = ({ name, length, link }) => {
    return (
        <Link to={link} className='room'>
            <h4 className="room-name">{name}</h4>
            <div className="room-wrapper">
                <span>1st - Hồ Thị Thơm</span>
                <span>1500 points</span>
            </div>
            <div className="room-wrapper">
                <span>2nd - Trần Gia Thuận</span>
                <span>1200 points</span>
            </div>
            <div className="room-wrapper">
                <span>{length} members</span>
                <span>10:10:10 08/07/2021</span>
            </div>
        </Link>
    )
}
export { Room }