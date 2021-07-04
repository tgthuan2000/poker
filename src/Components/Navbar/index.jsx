import React, { useState } from 'react'
import './index.css'
import { NavLink, Bugger } from '../Button/index.jsx'
import NavbarMenu from '../../Data/NavbarMenu.jsx'

export default function Navbar() {
    const [listMenu,setListMenu] = useState(NavbarMenu)
    const [bugger,setBugger] = useState(false)
    const setFalse = (indexItem) => {
        const list = [...listMenu]
        list.forEach(item => item.active = false)
        if(indexItem != null) list[indexItem].active = true
        setListMenu(list)
    }
    const handleBuggerClick = () => {
        setBugger(!bugger)
    }
    const handleClick = (indexItem) => {
        setFalse(indexItem)
        setBugger(false)
    }
    const menu = listMenu.map((item, index) => 
        <NavLink
            key={index}
            active={item.active}
            name={item.name}
            path={item.path}
            onClick={() => handleClick(index)}
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
