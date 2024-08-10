import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='header'>
        <div className='logo'>VideoShare</div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/upload">Upload</Link>
        </nav>
    </header>
  )
}

export default Navbar
