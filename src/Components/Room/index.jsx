import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Room = ({ name, length, link }) => {
    return (
        <Link to={link} className='room'>
            <h4 className="room-name">{name}</h4>
            <span className="room-desc">{length} members</span>
        </Link>
    )
}
export { Room }