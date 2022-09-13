import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'
const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async()=>{
        localStorage.clear()
        navigate("/login")
    }
  return (
    <div className='lg:hover:bg-white lg:w-7 lg:h-7 lg:rounded-full lg:flex lg:items-center lg:justify-center lg:bg-red-500 '
    onClick={handleClick}>
        <BiPowerOff size={25}  className='lg:hover:text-red-500 lg:cursor-pointer'/>
    </div>
  )
}

export default Logout