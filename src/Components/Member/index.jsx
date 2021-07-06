import React, { useState } from 'react'
import './index.css'

export default function Member({ name, handleClickOption }) {
    return (
        <div className='member'>
            <div className='member-avatar'>{name[0]}</div>
            <h4 className='member-name'>{name}</h4>
            { handleClickOption &&
                <span className='member-option' onClick={handleClickOption}><i className="fas fa-ellipsis-v"></i></span>
            }
        </div>
    )
}

export const MemberModal = ({ name, onClick }) => {
    const [check, setCheck] = useState(false)
    const click = () => {
        setCheck(!check);
        onClick()
    }
    return (
        <div className={`member member-modal${check ? ' member-checked' : '' }`} onClick={click}>
            <div className='member-avatar'>{name[0]}</div>
            <h4 className='member-name'>{name}</h4>
            {check &&
                <i className="fas fa-check member-icon"></i>
            }
        </div>
    )
}