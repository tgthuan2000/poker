import React from 'react'
import './index.css'

const PageEmpty = ({ text, img }) => {
    return (
        <div className="page-empty">
            <img src={img} alt=" "/>
            <span>{text}</span>
        </div>
    )
}

export default PageEmpty
