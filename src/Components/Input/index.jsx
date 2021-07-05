import React from 'react'
import './index.css'

function Input({ placeholder, onKeyUp, useRef, className, autoFocus }) {
    return (
        <input className={`input${className ? ' '+className : ''}`} ref={useRef} autoFocus={autoFocus} onKeyUp={onKeyUp} placeholder={placeholder ? placeholder : ''}/>
    )
}

export {Input}