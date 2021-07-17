import React from 'react'
import './index.css'

const Frame = ({ frame , title, url, titleColor, children }) => {
    if(url && !frame) frame = `url(${url}) 30% round`;
    return (
        <div className='frame'>
            <div className="frame-member">
                <div className="frame-content">
                    {children}
                <div className="frame-image" style={{borderImage:frame}} />
                </div>
            </div>
            <div className="frame-title" >
                <span style={{color: titleColor}}>{title}</span>
                <div className="frame-image" style={{borderImage:frame}} />
            </div>
        </div>
    )
}

export const InitialMember = ({children}) => {
    return (
        <Frame 
            url='/frames/dandelion2.png'
            title='Những người dẫn đầu'
        >
            {children}
        </Frame>
    )
}