import React from 'react'
import './index.css'

function Input({ placeholder, onInput, useRef, className, autoFocus }) {
    return (
        <input className={`input${className ? ' '+className : ''}`} ref={useRef} autoFocus={autoFocus} onInput={onInput} placeholder={placeholder ? placeholder : ''}/>
    )
}

export {Input}