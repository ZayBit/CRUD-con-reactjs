import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
export const Navbar = () => {
    const [routes, setRoutes] = useState([
        {
            path: '/',
            name: 'Inicio',
            active: ''
        },
        {
            path: '/create',
            name: 'Crear',
            active: ''
        }
    ])
    const location = useLocation().pathname;
    useEffect(() => {
        setRoutes(routes.map(route => (route.path === location) ? { ...route, active: 'active' } : { ...route, active: '' }))
    }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <nav className="navbar">
            <h1 className="navbar-title">C R U D</h1>
            <ul>
                {
                    routes.map(route => (
                        <li className="nav-item" key={route.name}>
                            <Link to={route.path} className={"nav-link " + route.active}>{route.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}