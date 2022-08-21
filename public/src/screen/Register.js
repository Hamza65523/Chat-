import React,{useState} from 'react'
import Logo from '../assets/logo.jpg'
import {Link} from 'react-router-dom'
const Register = () => {
  const [value,setValue] = useState({
    username:'',
    email:'',
    password:''
  })
  const handlerChange=(e)=>{
   setValue( {
    ...value,
    [e.target.name]:e.target.value
  })
  }
  const handlerSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    <div>
       <div className="bg-PurplePain flex  justify-center items-center w-[100vw] h-[100vh]">
           <form onSubmit={handlerSubmit}>
       <div className="text-white bg-blue-500 gap-4 justify-center items-center rounded-2xl  px-4  py-2 text-2xl font-0 font flex flex-col ">
           <div className="gap-3 w-[350px] text-center mt-3 flex items-center justify-center ">
              <img src={Logo} className='max-w-[25%] rounded-xl w-25' alt="" />
                <h1 className='text-4xl'>Chat</h1>
            </div> 
            <div className="flex flex-col justify-center items-center gap-6 text-xl">
            <input className='outline-white font-0 text-blue-500 px-3 rounded-lg py-1' name='username' onChange={handlerChange} placeholder='Username' type="text" />
            <input className='outline-white font-0 text-blue-500 px-3 rounded-lg py-1' name='email' onChange={handlerChange} placeholder='Email' type="email" />
            <input className='outline-white font-0 text-blue-500 px-3 rounded-lg py-1' name='password' onChange={handlerChange} placeholder='Password' type="password" />
            <input className='outline-white font-0 text-blue-500 px-3 rounded-lg py-1' name='confirmPassword' onChange={handlerChange} placeholder='Confim Password' type="password" />
            </div>
            <button className='text-lg py-1 px-4 bg-blue-500 hover:bg-blue-400  text-white border-2 border-white rounded-xl' type='submit'>Create</button>
            <div className="flex gap-2 uppercase font-0 mb-2">
            <h1 className=' text-lg '>already have an account</h1>
            <Link to='/login' className='cursor-pointer  text-blue-800 hover:text-blue-900 text-lg'>Login</Link>
            </div>
        </div>
           </form>
       </div>
    </div>
  )
}

export default Register