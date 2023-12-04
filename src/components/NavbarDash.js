import React from 'react'
import '../Styling/NavbarDash.scss'
import logo from '../assets/LogoNoir.png'
import { Link } from 'react-router-dom'
const NavbarDash = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <Link>{/* <img src={logo} alt='' className='logo' /> */}</Link>
      </div>
    </div>
  )
}

export default NavbarDash
