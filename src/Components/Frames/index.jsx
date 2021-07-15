import React from 'react'
import './index.css'

const Frame = ({ frame, titleFrame = frame, title, titleColor }) => {
    return (
        <div className='frame'
            style={{borderImage:frame}}
        >
            <div className="frame-member"></div>
            <div className="frame-title"
                style={{borderImage:titleFrame}}
            >
                <span style={{color: titleColor}}>{title}</span>
            </div>
        </div>
    )
}

export const InitialMember = () => {
    return (
        <Frame 
            frame='url(./frames/rose.png) 30% round'
            title='Initial Member'
            titleFrame='url(./frames/rose.png) 20% round'
            titleColor='hsl(123, 100%, 40%)'
        />
    )
}

export const Royal = () => {
    return (
        <Frame 
            frame='url(./frames/dandelion.png) 30% round'
            title='Royal'
            titleFrame='url(./frames/dandelion.png) 20% round'
            titleColor='hsl(45, 100%, 40%)'
        />
    )
}

export const Royal2 = () => {
    return (
        <Frame 
            frame='url(./frames/dandelion2.png) 30% round'
            title='Royal 2'
            titleFrame='url(./frames/dandelion2.png) 20% round'
            titleColor='hsl(65, 100%, 40%)'
        />
    )
}