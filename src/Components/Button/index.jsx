import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function NavLink({ children, active, name, onClick, path}) {
    return (
        <Link to={path} className={`btn btnIcon${active ? ' active' : ''}`} onClick={onClick}>
            {children}
            <span className='span'> {name} </span>
        </Link>
    )
}

function Bugger({ active, onClick}) {
    return (
        <button className={`btn btnIcon${active ? ' bugger' : ''}`} onClick={onClick}>
            {active ?
            <>
                <div className="btnWrap">
                    <span> React Poker </span>
                    <i className='fas fa-times' />
                </div>
            </>
            : <i className='fas fa-bars' />}
        </button>
    )
}

function Button({ children, onClick, icon, active, outline, className, fullView}) {
    const template = `${active ? ' active' : ''}${outline ? ' outline' : ''}${className ? ' '+className : ''}${fullView ? ' fullview' : ''}`
    return (
        <button className={`btn btnText${template}`} onClick={onClick}>
            {icon && <i className={icon} />}
            {children && <span className='text'>{children}</span>}
        </button>
    )
}

function ButtonLink({ children, link, icon, active, outline, className, fullView}) {
    const template = `${active ? ' active' : ''}${outline ? ' outline' : ''}${className ? ' '+className : ''}${fullView ? ' fullview' : ''}`
    return (
        <Link to={link} className={`btn btnText${template}`}>
            {icon && <i className={icon} />}
            {children}
        </Link>
    )
}

export { NavLink, Bugger, Button, ButtonLink }