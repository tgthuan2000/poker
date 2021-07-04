import React from 'react'
import './index.css'

export default function Member({ name, optionHandleClick }) {
    return (
        <div className='member'>
            <div className='member-avatar'>{name[0]}</div>
            <h4 className='member-name'>{name}</h4>
            <span className='member-option' onClick={optionHandleClick}><i className="fas fa-ellipsis-v"></i></span>
        </div>
    )
}
