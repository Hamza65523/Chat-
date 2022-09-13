import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute,host } from "../utils/ApiRoutes";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";
import {io} from 'socket.io-client'

const Chat = () => {

  const socket = useRef()
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchData = async()=>{
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setIsLoaded(true)
      }
    }
  useEffect(() => {
    
    fetchData()
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host)
      socket.current.emit("add-user",currentUser._id)
    }
},[currentUser])
  useEffect(() => {
    const fetchData = async()=>{
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data)
      } else {
        navigate("/setAvatar");
      }
    }
  }
    fetchData()

  }, [currentUser]);
  const handlerChatChange = (chat)=>{
    setCurrentChat(chat)
  }
  return (
    <div className="md:bg-orange-300 md:w-full md:h-[100vh]  bg-orange-300  w-full  h-[100vh]  lg:bg-orange-300 lg:w-full lg:h-full lg:py-16">
      <div className="md:text-white md:flex md:rounded-md md:bg-gray-800  md:h-full text-white flex rounded-md bg-gray-800  h-full  lg:text-white lg:flex lg:rounded-md lg:bg-gray-800 lg:w-[80%]  lg:h-[90%] lg:mx-auto lg:my-0">
        <Contacts changeChat={handlerChatChange} currentChat={currentChat} currentUser={currentUser} contacts={contacts} />
        {isLoaded && currentChat=== undefined?(
          <Welcome currentUser={currentUser}/>
        )
        :
        (<ChatContainer socket={socket} currentChat={currentChat} currentUser={currentUser}/>)
        }
      </div>
    </div>
  );
};

export default Chat;
