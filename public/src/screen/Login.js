import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import {loginRoute} from '../utils/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate('/')
    }
  },[])
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const toastOption = {
    position:'bottom-right',
    autoClose:5000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
  }
  const handlerValidation = () => {
    const { username, password} = value;
    if(username.length===''){
      toast.error("Username or Password is required",toastOption);
      return false;
    }else if(password.length === ''){
      toast.error("Username or Password is required",toastOption);
      return false;
    }
    return true
  };
  const handlerSubmit=async(e)=>{
    e.preventDefault()
    if(handlerValidation()){
      const {username,password} = value
      const {data} = await axios.post(loginRoute,{
        username,
        password
      })
      if(data.status === false){
        toast.error(data.msg,toastOption)
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        navigate('/')
      }
    }
  }
  const handlerChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    
  };

  return (
    <div>
      <div className="md:bg-PurplePain md:flex  md:justify-center md:items-center md:w-[100vw] md:h-[100vh] bg-PurplePain flex  justify-center items-center w-[100vw] h-[100vh] lg:bg-PurplePain lg:flex  lg:justify-center lg:items-center lg:w-[100vw] lg:h-[100vh]">
        <form onSubmit={handlerSubmit}>
          <div className=" text-white bg-blue-500 gap-16 justify-center items-center rounded-2xl  px-4  py-2 text-2xl font-0 font flex flex-col  lg:text-white lg:bg-blue-500 lg:gap-16 lg:justify-center lg:items-center md:rounded-2xl  md:px-4  md:py-2 md:text-2xl md:font-0 font md:flex md:flex-col  md:items-center lg:rounded-2xl  lg:px-4  lg:py-2 lg:text-2xl lg:font-0 font lg:flex lg:flex-col ">
            <div className="gap-3 w-[200px] text-center mt-3 flex items-center justify-center md:gap-3 md:w-[500px] md:text-center md:mt-3 md:flex md:items-center md:justify-center  lg:gap-3 lg:w-[350px] lg:text-center lg:mt-3 lg:flex lg:items-center lg:justify-center ">
              <img src={Logo} className="md:max-w-[25%] md:rounded-xl md:w-25 max-w-[25%] rounded-xl w-25  lg:max-w-[25%] lg:rounded-xl lg:w-25" alt="" />
              <h1 className="text-4xl md:text-4xl lg:text-4xl">Chat</h1>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 text-xl md:flex md:flex-col md:justify-center md:items-center md:gap-6 md:text-xl lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-6 lg:text-xl">
              <input
                className="md:w-[300px] outline-white font-0 text-blue-500 px-3 rounded-lg py-2 lg:outline-white lg:font-0 lg:text-blue-500 lg:px-3 lg:rounded-lg lg:py-2"
                name="username"
                onChange={handlerChange}
                placeholder="Username"
                type="text"
              />

              <input
                className="md:w-[300px] outline-white font-0 text-blue-500 px-3 rounded-lg py-2 lg:outline-white lg:font-0 lg:text-blue-500 lg:px-3 lg:rounded-lg lg:py-2"
                name="password"
                onChange={handlerChange}
                placeholder="Password"
                type="password"
              />
            </div>
            <button
              className="md:text-xl  text-lg py-3 px-4 bg-blue-500 hover:bg-blue-400  text-white border-2 border-white rounded-xl"
              type="submit"
            >
              Login
            </button>
            <div className="flex gap-2 uppercase font-0 mb-2">
              <h1 className="md:text-lg  text-sm  ">Login to your account</h1>
              <Link
                to="/register"
                className="cursor-pointer md:text-lg  text-sm  text-blue-800 hover:text-blue-900 "
              >
                Register
              </Link>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
