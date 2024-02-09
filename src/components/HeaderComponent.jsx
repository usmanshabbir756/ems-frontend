import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <a className='navbar-brand' href='#'>Employee Managment System</a>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <NavLink to={"/employees"} className="nav-link">Employee</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink to={"/departments"} className="nav-link">Department</NavLink>
                </li>
              </ul>
            </div>
        </nav>
    </div>
  )
}

export default HeaderComponent