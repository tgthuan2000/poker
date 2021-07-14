import React from 'react'
import './index.css'

const PageEmpty = ({ text, img, height = '100vh', onClick }) => {
    return (
        <div className="page-empty" style={{height:height}} >
            <img src={img} alt=" " style={{cursor: onClick && 'pointer'}} onClick={onClick}/>
            <span style={{cursor: onClick && 'pointer'}} onClick={onClick}>{text}</span>
        </div>
    )
}

export default PageEmpty
