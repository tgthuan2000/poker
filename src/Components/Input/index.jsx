import React from 'react'
import './index.css'

function Input({ placeholder, handleKeyup, useRef, className }) {
    return (
        <input className={`input${className ? ' '+className : ''}`} ref={useRef} autoFocus onKeyUp={handleKeyup} placeholder={placeholder ? placeholder : ''}/>
    )
}

export {Input}