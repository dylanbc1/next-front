import React from 'react'
import style from './navbar.module.css'

import ActiveLink from '../active-link/ActiveLink'

function Navbar() {
    const navItems = [
        {
            path: '/about',
            text: 'About'
        },
        {
            path: '/contact',
            text: 'Contact'
        },
        {
            path: '/profile',
            text: 'Profile'
        },
    ];

    return (
        <nav className='flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded'>
            <a href="/">Home</a>
            <div className='flex flex-1'></div>
            
            {navItems.map( ({path, text}) => (
                <ActiveLink key={path} path={path} text={text}/>
            ) )}
        </nav>
    )
}

export default Navbar