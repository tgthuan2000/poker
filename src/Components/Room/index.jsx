import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Room = ({ name, length, link, createAt, active }) => {
    return (
        <Link to={link} className={`room${active ? ' active' : ''}`}>
            <div className="room-wrapper">
                <h4 className="room-name">{name}</h4>
                <b className="room-status">{active ? 'Active' : 'Block'}</b>
            </div>
            {/* <div className="room-wrapper">
                <span>1st - Hồ Thị Thơm</span>
                <span>1500 points</span>
            </div>
            <div className="room-wrapper">
                <span>2nd - Trần Gia Thuận</span>
                <span>1200 points</span>
            </div> */}
            <div className="room-wrapper">
                <span>{length} members</span>
                <span>{createAt}</span>
            </div>
        </Link>
    )
}

const ModalRoom = ({ name, length, onClick, active }) => {
    return (
        <div className={`room room-modal${active ? ' active' : ''}`} onClick={onClick}>
            <div className="room-wrapper">
                <h4 className="room-name">{name}</h4>
            </div>
            <div className="room-wrapper">
                <span>{length} members</span>
                <span>mới tạo gần đây</span>
            </div>
        </div>
    )
}


export { Room, ModalRoom }