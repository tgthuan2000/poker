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
                <span style={{marginLeft:'-15px', marginRight:'100px',fontSize:'20px',fontWeight:'600'}}> Menu </span>
                <i className='fas fa-times' />
            </>
            : <i className='fas fa-bars' />}
        </button>
    )
}


function Button({ children, onClick, icon, active, outline, className}) {
    return (
        <button className={`btn btnText${active ? ' active' : ''}${outline ? ' outline' : ''}${className ? ' '+className : ''}`} onClick={onClick}>
            {icon ? <i className={icon} /> : ''}
            {children}
        </button>
    )
}
export { NavLink, Bugger, Button }