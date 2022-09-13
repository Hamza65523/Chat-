import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
const Contacts = ({ currentUser, contacts,changeChat,currentChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  };
  return (
   
    <div  className={ currentChat ?"hidden lg:block lg:text-white lg:bg-slate-900 lg:h-full lg:rounded-md lg:py-4 lg:px-4 lg:w-[20rem]":"md:text-white md:bg-slate-900 md:h-full md:rounded-md md:py-4 md:px-4 md:w-[20rem] text-white bg-slate-900 h-[100vh] rounded-md py-4 px-4 w-full  lg:text-white lg:bg-slate-900 lg:h-full lg:rounded-md lg:py-4 lg:px-4 lg:w-[20rem]"}>
      {currentUserImage && currentUserName && (


        <div className="">
          <div className="md:flex md:items-center md:mb-4 md:gap-x-4 flex items-center mb-4 gap-x-4 lg:flex lg:items-center lg:mb-4 lg:gap-x-4">
          <img src={Logo} className="md:max-w-[25%] md:rounded-xl md:w-25 max-w-[15%] rounded-xl w-15 lg:max-w-[25%] lg:rounded-xl lg:w-25" alt="" />
            <h1 className=" text-4x md:text-4x lg:text-4xl ">Chat</h1>
          </div>
         
          <div  className=" md:rounded-3xl md:scrollbar md:mb-8 md:scrollbar-md:thumb-slate-600  md:scrollbar-track-rounded md:scrollbar-thumb-rounded-full md:scrollbar-track-gray-100 md:space-y-2 md:overflow-scroll md:h-[80%] rounded-3xl scrollbar mb-8 scrollbar-thumb-slate-600  scrollbar-track-rounded scrollbar-thumb-rounded-full scrollbar-track-gray-100 space-y-2 overflow-scroll h-[80%] lg:rounded-3xl lg:scrollbar lg:mb-8 lg:scrollbar-lg:thumb-slate-600  lg:scrollbar-track-rounded lg:scrollbar-thumb-rounded-full lg:scrollbar-track-gray-100 lg:space-y-2 lg:overflow-scroll lg:h-[80%]">
            {contacts.map((contact, index) => (
               
              <div
                className={`flex gap-x-4 rounded-md px-2 py-4 items-center bg-gray-500 md:flex md:gap-x-4 md:rounded-md md:px-2 md:py-4 md:items-center md:bg-gray-500 lg:flex lg:gap-x-4 lg:rounded-md lg:px-2 lg:py-4 lg:items-center lg:bg-gray-500${
                  index === currentSelected ? "selected lg:bg-gray-700" : ""
                }`}
                key={index}
                onClick={()=>changeCurrentChat(index,contact)}
              >
                 
                <div className="w-[50px] md:w-[50px] lg:w-[50px]">
                  <img
                    className="w-[50px] md:w-[50px] lg:w-[50px]"
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}

                  />
                </div>
                <div className="username">
                  <h3 className="text-xl font-mono md:text-xl md:font-mono lg:text-xl lg:font-mono">{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="md:justify-center  md:h-[4rem] md:py-2 md:rounded-xl md:bg-gray-800 justify-center  h-[4rem] py-2 rounded-xl bg-gray-800   lg:justify-center  lg:h-[4rem] lg:py-2 lg:rounded-xl lg:bg-gray-800 flex gap-4 items-center ">
            <div className="w-[50px] md:w-[50px] lg:w-[50px]">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} />
            </div>
            <div className="">
              <h1 className="text-3xl md:text-3xl lg:text-3xl">{currentUserName}</h1>
            </div>
          </div>
        </div>
      
      )}
    </div>
  );
};

export default Contacts;
