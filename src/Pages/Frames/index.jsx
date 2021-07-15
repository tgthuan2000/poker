import React from 'react'
import './index.css'
import { InitialMember, Royal, Royal2 } from '../../Components/Frames'

const Frames = () => {
    return (
        <div className='frames'>
            <InitialMember />
            <Royal />
            <Royal2 />
        </div>
    )
}

export default Frames