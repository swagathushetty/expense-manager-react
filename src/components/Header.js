import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {

    return (<header>
        <h1>expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home page</NavLink>
        <NavLink to="/create" activeClassName="is-active"> expense page</NavLink>
        <NavLink to="/edit" activeClassName="is-active">Edit page</NavLink>
        <NavLink to="/help" activeClassName="is-active">Help page</NavLink>
    </header>
    )
}

export default Header