import React from 'react'
import Robot from '../assets/robot.gif'
const Welcome = ({currentUser}) => {
  return (
    <div className='hidden w-full text-center md:w-full md:text-center lg:w-full lg:text-center'>
        <div className="md:text-white  md:mx-auto text-white  mx-auto lg:text-white  lg:mx-auto my-0">
            <div className="mx-auto w-96 md:mx-auto md:w-96 lg:mx-auto lg:w-96">
            <img src={Robot} className='scale-75 md:scale-75 lg:scale-75 ' alt="" />
            </div>
            <h1 className=' md:text-xl lg:text-xl'>Welcome, <span className='text-blue-700 md:text-blue-700 lg:text-blue-700'>{currentUser.username}!</span></h1>
            <h3 className=' md:text-xl lg:text-xl'>Please select a chat to start messaging</h3>
        </div>
    </div>
  )
}

export default Welcome