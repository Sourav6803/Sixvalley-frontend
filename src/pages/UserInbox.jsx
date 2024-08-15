import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { TfiGallery } from "react-icons/tfi";
import styles from "../styles/styles";
import { toast } from "react-toastify";
import { newMessages, uploadFile } from "../service/api";
import { MdDownloadForOffline } from "react-icons/md";
import { downloadMedia } from "../utils/common-utils";
import EmojiPicker from 'emoji-picker-react';
import ClipLoader from "react-spinners/ClipLoader"
// const ENDPOINT = "https://multivendor-socket.onrender.com";
const ENDPOINT = "http://localhost:4000";

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const [groupTitle, setGroupTitle] = useState()

  const [img, setImg] = useState('')
  const [val, setVal] = useState('')
  const [fil, setFil] = useState()
  const [newMessageFlag, setNewMessageFlag] = useState()
  const [isSuccess, setissuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [imgLoading, setImgLoading] = useState(false)


  useEffect(() => {
    const getImage = async () => {
      try {
        if (fil) {
          const data = new FormData();
          data.append("name", fil.name);
          data.append("file", fil);
          setImgLoading(true)
          const response = await uploadFile(data);
          setImg(response?.data);
          setImgLoading(false)
          console.log(response.data.message)
          toast.error(response.data.message)
          response.data.message === "Only JPEG, PNG, SVG, JPG and GIF images are allowed!" ? setIsError(true) : setIsError(false)
          
        }
      } catch (error) {
        //console.log(error.response.data.message)
        toast.error(error.message)
      }
    }
    getImage();
  }, [fil])

  const onFileChange = (e) => {
    setVal(e.target?.files[0]?.name);
    setFil(e.target?.files[0]);
    const selectedFile = e.target?.files[0]
    const allowedType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/svg']
    if (!allowedType.includes(selectedFile?.type)) {
      setIsError(true)
      setErrorMessage("Only JPEG, PNG, SVG, JPG and GIF images are allowed!")
    }
  }

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(`${server}/conversation/get-all-conversation-user/${user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(resonse.data.conversations);
      } catch (error) {
        toast.error(error.message)
      }
    };
    getConversation();
  }, [user]);


  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat, newMessageFlag, user?._id]);



  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault()
    let message = {};
    if (!fil) {
      message = {
        sender: user._id,
        text: val,
        conversationId: currentChat._id,
        type: 'text',
      };
    } else {
      message = {
        sender: user._id,
        text: img,
        conversationId: currentChat._id,
        type: 'file',
      };
    }

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: val,
    });

    await newMessages(message)

    setVal('');
    setFil();
    setImg('');
    setNewMessageFlag(prev => !prev);

    // setIsError(false)
    // setissuccess(true)
  };



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);


  return (
    <div className="w-full">
      {!open && (
        <>
          <Header />

          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}

          {conversations?.length && conversations.map((item, index) => (
            <>

              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user?._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                loading={loading}
                value={val}
                groupTitle={groupTitle}
                setGroupTitle={setGroupTitle}
              />
            </>
          ))}
        </>
      )}


      {open && (
        <SellerInbox
          setOpen={setOpen}
          data={conversations}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={user._id}
          groupTitle={groupTitle}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          value={val}
          onFileChange={onFileChange}
          setValue={setVal}
          isError={isError}
          errorMessage={errorMessage}
          imgLoading={imgLoading}
          setImgLoading={setImgLoading}
        />
      )}
    </div>
  );
};

const MessageList = ({ data, index, setOpen, setCurrentChat, me, setUserData, userData, online, setActiveStatus, loading, groupTitle, setGroupTitle }) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id, data) => {
    setGroupTitle(data?.groupTitle)
    navigate(`/inbox?${id}`);
    setOpen(true);
  };


  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);


  const msgLength = data?.lastMessage?.length >= 10 ? data?.lastMessage.slice(0, 10) + "..." : data?.lastMessage


  return (

    <div
      className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"}  cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id, data) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img src={`${user?.avatar}`} alt="hhh" className="w-[50px] h-[50px] rounded-full" />

        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name} ({data?.groupTitle?.length > 19 ? data?.groupTitle.slice(0, 19) + "..." : data?.groupTitle})</h1>
        <p className="text-[16px] text-[#000c]">


          {(/\.(gif|jpg|jpeg|tiff|png)$/i).test(data.lastMessage) ? "Photo" : msgLength}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen, value, groupTitle, data,setImgLoading, imgLoading, setValue, onFileChange, sendMessageHandler, messages, sellerId, userData, activeStatus, scrollRef, isError, errorMessage }) => {

const [emoji , setEmoji] = useState(false)

console.log(isError)

const emojiClick = ((e, emojiObj)=>{
  setValue(prevInput => prevInput + emojiObj.emoji)
  setEmoji(false)
})

  return (
    <div className="w-[full] min-h-full flex flex-col justify-between p-5">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-[#00bfa5]">
        <div className="flex">
          <img
            src={`${userData?.avatar}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[400] text-white">{userData?.name}</h1>
            <p className="text-white">({groupTitle})</p>
            <h1 className="text-white text-[14px]">{activeStatus ? "Active Now" : "offline"}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[75vh] py-3 overflow-y-scroll " style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
        {messages && messages.map((item, index) => (

          <>

            <div className={`flex w-full my-2 ${item?.sender === sellerId ? "justify-end" : "justify-start"}`} ref={scrollRef} key={index} >

              {
                item?.type === 'file' ?
                  <div >
                    <div style={{ position: 'relative' }}>
                      <img src={`${item?.text}`} alt="" className="w-[200px] h-[200px] object-cover rounded-[10px] ml-2 mb-2 border" />
                      {
                        item.sender !== sellerId ? <div style={{ position: 'absolute', bottom: 0, right: 0, cursor: 'pointer' }}>
                          <MdDownloadForOffline size={30} style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%', }} fontSize='large' onClick={(e) => downloadMedia(e, item.text)} />
                        </div> : ''
                      }
                    </div>

                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                    {
                      imgLoading && (<ClipLoader />)
                    }
                  </div>
                  :
                  <div>
                    <div style={{ maxWidth: '90%', wordBreak: 'break-word', width: 'fit-content' }} className={`w-max p-2 rounded ${item.sender === sellerId ? "bg-green-300 ml-auto  " : "bg-[#e18181]"} text-black h-min`}>
                      <p>{item?.text}</p>
                    </div>

                    <p className="text-[12px] text-[#000000d3] pt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
              }
            </div>
          </>
        ))}
      </div>

      {/* send message input */}
      <form
        aria-required='true'
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px] ">
          
            {/* <MdEmojiEmotions  onClick={e=>setEmoji(val=> !val)} /> */}
            {/* {
              emoji && <EmojiPicker className=" absolute mt-5  cursor-pointer mr-2 w-[100%]" size={20} onClick={emojiClick} pickerStyle={{width: '100%'}} />
            } */}
            <input
              type="file"
              name=""
              id="image"
              className="hidden"
              onChange={(e) => onFileChange(e)}
            />
            <label htmlFor="image">
              <TfiGallery className="cursor-pointer" size={20} />
            </label>
          
        </div>
        
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            {
              imgLoading === false && isError === false && <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
            }
          </label>
        </div>
      </form>
    </div>
  );
};






export default UserInbox;
