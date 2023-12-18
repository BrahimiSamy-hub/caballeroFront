import React from 'react'
import '../Styling/NavbarDash.scss'
import { Link } from 'react-router-dom'
const NavbarDash = () => {
  return (
    <div className='navbar'>
      <div className=''>
        <Link>{/* <img src={logo} alt='' className='logo' /> */}</Link>
      </div>
    </div>
  )
}

export default NavbarDash
