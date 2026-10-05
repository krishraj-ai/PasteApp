import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 font-bold text-blue-700 bg-slate-300 p-4'>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/pastes"}>Pastes</NavLink>
          {/* <NavLink>ViewPastes</NavLink>
        //  <NavLink></NavLink> */}
    </div>
  )
}

export default Navbar
