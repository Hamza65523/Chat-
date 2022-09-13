import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import {registerRoute} from '../utils/ApiRoutes'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
const Register = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate('/')
    }
  },[])
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOption = {
    position:'bottom-right',
    autoClose:5000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
  }
  const handlerValidation = () => {
    const { username, email, password, confirmPassword } = value;
    if (username.length < 3) {
      toast.error("Username is not less than 3",toastOption);
      return false;
    }else if(password.length<8){
      toast.error("Password is not less than 8",toastOption);
      return false;
    }else if(email ===""){
      toast.error("Email is required",toastOption)
      return false
    }
    else if(password !== confirmPassword){
      toast.error("Password are not same",toastOption);
      return false;
    }
    return true
  };
  const handlerSubmit=async(e)=>{
    e.preventDefault()
    if(handlerValidation()){
      const {username,email,password} = value
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password
      })
      console.log(data,'data')
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
                name="email"
                onChange={handlerChange}
                placeholder="Email"
                type="email"
              />
              <input
                  className="md:w-[300px] outline-white font-0 text-blue-500 px-3 rounded-lg py-2 lg:outline-white lg:font-0 lg:text-blue-500 lg:px-3 lg:rounded-lg lg:py-2"
                name="password"
                onChange={handlerChange}
                placeholder="Password"
                type="password"
              />
              <input
                  className="md:w-[300px] outline-white font-0 text-blue-500 px-3 rounded-lg py-2 lg:outline-white lg:font-0 lg:text-blue-500 lg:px-3 lg:rounded-lg lg:py-2"
                name="confirmPassword"
                onChange={handlerChange}
                placeholder="Confim Password"
                type="password"
              />
            </div>
            <button
               className="md:text-xl  text-lg py-3 px-4 bg-blue-500 hover:bg-blue-400  text-white border-2 border-white rounded-xl"
              type="submit"
            >
              Create
            </button>
            <div className="md:flex md:gap-2  md:font-0 md:mb-2 lg:flex lg:gap-2 uppercase lg:font-0 lg:mb-2">
              <h1 className="md:text-lg lg:text-sm  ">already have an account</h1>
              <Link
                to="/login"
                className="md:text-lg lg:cursor-pointer lg:text-sm  md:text-blue-800 md:hover:text-blue-900 lg:text-blue-800 lg:hover:text-blue-900 "
              >
                Login
              </Link>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
