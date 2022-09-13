import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { setAvatarRoute } from "../utils/ApiRoutes";
import Loader from '../assets/loader.gif'
import 'react-toastify/dist/ReactToastify.css'
import { Buffer } from "buffer";
import axios from "axios";
const SetAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const navigate = useNavigate();
  const api = "https://api.multiavatar.com/565675624";
  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }
  },[])
  const setProfilePicture = async () => {

    if(selectedAvatar === undefined){
      toast.error("Plz select an avatar",toastOption)
    }else{
      const user = await JSON.parse(localStorage.getItem('chat-app-user'))

      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar]
      })
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',JSON.stringify(user))
        navigate('/')
      }else{
        toast.error("Error setting avatar. Please try again",toastOption)
      }
    }
  };
  useEffect(() => {
    // declare the data fetching function
    setIsLoading(true)
    const fetchData = async () => {
      let data = []
      for(let i =0;i<4;i++){
        const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
        const buffer = new Buffer(image.data)
        data.push(buffer.toString("base64"))
      }
      setAvatars(data)
      setIsLoading(false)
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return (
    <>
      {
        isLoading? <div className="bg-slate-700 flex justify-center items-center h-[100vh] w-75 mx-auto my-0 lg:bg-slate-700 lg:flex lg:justify-center lg:items-center lg:h-[100vh] lg:w-75 lg:mx-auto lg:my-0 ">
          <img src={Loader} className='bg-slate-700 mx-auto  lg:bg-slate-700 lg:mx-auto ' alt="" />
        </div>:(

          <div className="text-center bg-slate-700 h-[100vh] flex flex-col items-center justify-center gap-8 lg:text-center lg:bg-slate-700 lg:h-[100vh] lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-8">
        <h1 className="text-white text-4xl font-0 lg:text-white lg:text-4xl lg:font-0">Pick an avatar as your profile picture</h1>
      <div className="flex flex-wrap justify-center gap-2 tems-center  w-[100vw] lg:flex lg:gap-8 lg:justify-center lg:tems-center  lg:w-[100vw]">
        {avatars.map((avatar, index) => {
          return (
            <div key={index} className={`avatar w-[150px]  lg:w-[200px] ${
              selectedAvatar === index? "border-8 border-blue-500 rounded-full lg:border-8 lg:border-blue-500 lg:rounded-full selected":""
            }`}>
              <img src={`data:image/svg+xml;base64,${avatar}`} 
              onClick={()=>setSelectedAvatar(index)} alt="avatar" />
            </div>
          )
        })}
      </div>
      <div className="text-white text-4xl lg:text-white lg:text-4xl">
        <button onClick={setProfilePicture} className="hover:animate-none animate-pulse px-4 py-3 rounded-lg bg-purple-500 first-letter lg:hover:animate-none lg:animate-pulse lg:px-4 lg:py-3 lg:rounded-lg lg:bg-purple-500 lg:first-letter">Set a Profile Pic</button>
      </div>
      <ToastContainer/>
    </div>
      )
    }
    </>
  );
};

export default SetAvatar;
