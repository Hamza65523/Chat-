import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import '../styles/chatinput.css'
import { BsEmojiSmileFill } from "react-icons/bs";
const ChatInput = ({handlerSendMsg}) => {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false)
  const [msg,setMsg] = useState("")

    const handlerEmojiPickerHideShow=()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }
    const handlerEmojiClick=(event,emoji)=>{
        let message = msg;
        message += emoji.emoji
        setMsg(message)
    }
    const sendChat = (event)=>{
        event.preventDefault()
        if(msg.length>0){
            handlerSendMsg(msg)
            setMsg('')
        }
    }
  return (
    <div className="md:absolute md:bottom-0 md:flex md:gap-3  md:px-4 md:py-2 md:items-center md:w-full md:bg-blue-700 absolute bottom-0 flex gap-3  px-4 py-2 items-center w-full bg-blue-700 lg:absolute lg:bottom-0 lg:flex lg:gap-3  lg:px-4 lg:py-2 lg:items-center lg:w-full lg:bg-blue-700">
      <div className="ml-4 w-[30px] h-[30px] md:ml-4 md:w-[30px] md:h-[30px]  lg:ml-4 lg:w-[30px] lg:h-[30px] ">
        <BsEmojiSmileFill size={30} onClick={handlerEmojiPickerHideShow}/>
        {
            showEmojiPicker && <Picker className='md:absolute absolute lg:absolute' onEmojiClick={handlerEmojiClick}/>
        }
      </div>
      <form onSubmit={(e)=>sendChat(e)} className="w-full md:w-full lg:w-full">
        <div className="flex gap-2 md:flex md:gap-2 lg:flex lg:gap-2 ">
          <input
            type="text"
            className="md:outline-none md:text-black md:rounded-3xl md:py-3 md:w-full md:px-4 outline-none text-black rounded-3xl py-2 w-full px-4 lg:outline-none lg:text-black lg:rounded-3xl lg:py-3 lg:w-full lg:px-4"
            placeholder="type your message here"
            value={msg}
            onChange={(e)=>setMsg( e.target.value)}
          />
          <button>
            <IoMdSend size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
