import React, { useState } from 'react'
import './index.css'
import { NavLink, Bugger } from '../Button'
import { NavbarMenu } from '../../Data'
import { useLocation } from 'react-router'

export default function Navbar() {
    const [bugger,setBugger] = useState(false)
    const handleBuggerClick = () => {
        setBugger(!bugger)
    }
    const localtion = useLocation()
    const menu = NavbarMenu.map((item, index) => 
        <NavLink
            key={index}
            name={item.name}
            path={item.path}
            onClick={() => setBugger(false)}
            active={'/' + localtion.pathname.split('/')?.[1] === item.path}
        >
            <i className={item.icon}></i>
        </NavLink>
    )
    return (
        <div className={`navbar${bugger ? ' show' : ''}`}>
            <Bugger onClick={handleBuggerClick} active={bugger}/>
            {menu}
        </div>
    )
}
