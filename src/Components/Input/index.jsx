import React from 'react'
import './index.css'

function Input({ placeholder, handleKeyup, useRef }) {
    return (
        <input className='input' ref={useRef} autoFocus onKeyUp={handleKeyup} placeholder={placeholder ? placeholder : ''}/>
    )
}

export {Input}