import React from 'react'
import './index.css'

const PageEmpty = ({ text, img, height = '100vh' }) => {
    return (
        <div className="page-empty" style={{height:height}}>
            <img src={img} alt=" "/>
            <span>{text}</span>
        </div>
    )
}

export default PageEmpty
