import React from 'react'
import { Outlet, NavbarDash, Menu } from '../components'
import '../Styling/HomeDash.scss'
const HomeDash = () => {
  return (
    <div className='main'>
      {/* <NavbarDash />
      <div className='container'>
        <div className='menuContainer'>
          <Menu />
        </div>
        <div className='contentContainer'>
          <Outlet />
        </div>
      </div> */}
    </div>
  )
}

export default HomeDash
