import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { newMessages, uploadFile } from "../../service/api";
import { MdDownloadForOffline } from "react-icons/md";
import { downloadMedia } from "../../utils/common-utils";
import { LuCheckCheck } from "react-icons/lu";

// const ENDPOINT = "https://multivendor-socket.onrender.com"
const ENDPOINT = "http://localhost:4000"

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [newMessageFlag, setNewMessageFlag] = useState()
  const scrollRef = useRef(null);
  

  const [img, setImg] = useState('')
  const [val, setVal] = useState()
  const [fil, setFil] = useState()
 


  const onFileChange = (e) => {
    setVal(e.target.files[0].name);
    setFil(e.target.files[0]);
  }

  useEffect(() => {
    const getImage = async () => {
      if (fil ) {
        const data = new FormData();
        data.append("name", fil.name);
        data.append("file", fil);

        const response = await uploadFile(data);
        setImg(response?.data);
      }
    }
    getImage();
  }, [fil])

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
    arrivalMessage && currentChat?.members?.includes(arrivalMessage?.sender) && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const resonse = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,{ withCredentials: true, });
           setConversations(resonse.data.conversations);
      } catch (error) {
        toast.error(error.message)
      }
    };
    getConversation();
  }, [seller]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
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
        console.log(error);
        toast.error(error?.message)
      }
    };
    getMessage();
  }, [currentChat, newMessageFlag, seller._id]);


  const sendMessageHandler = async (e) => {
    e.preventDefault()
    let message = {};
    if (!fil) {
      message = {
        sender: seller._id,
        text: val,
        conversationId: currentChat._id,
        type: 'text',
      };
    } else {
      message = {
        sender: seller._id,
        text: img,
        conversationId: currentChat._id,
        type: 'file',
      };
    }

    const receiverId = currentChat.members.find(
      (member) => member !== seller?._id
    );

    socketId.emit("sendMessage", {
      senderId: seller?._id,
      receiverId,
      text: val,
    });

    await newMessages(message)

    setVal('');
    setFil(null)  
    setImg(' ');
    setNewMessageFlag(prev => !prev);
    
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <div className="w-[90%] bg-white m-5 h-[90vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
            
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
                isLoading={isLoading}
              />
              
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          setMessages={setMessages}
          onFileChange={onFileChange}
          value={val}
          setValue={setVal}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  isLoading
}) => {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

 


  const msgLength = data.lastMessage?.length >= 10 ? data.lastMessage.slice(0, 10) + "..." : data.lastMessage

  return (
    <div
      className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"}  cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar}`}
          alt="user"
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {!isLoading && data?.lastMessageId !== user?._id
            ? "You:"
            : user?.name?.split(" ")[0] + ": "}{" "}
          {(/\.(gif|jpg|jpeg|tiff|png)$/i).test(data.lastMessage) ? "Photo" : msgLength}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  scrollRef,
  setOpen,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  onFileChange,
  value,
  setValue

}) => {

  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-green-500">
        <div className="flex">
          <img
            src={`${userData?.avatar}`}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[400] text-white">{userData?.name}</h1>
            <p className="text-[14px] text-white">{activeStatus ? "Active Now" : "Offline"}</p>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div className=" relative px-3 h-[65vh] py-3 overflow-y-scroll" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
        {messages && messages.map((item, index) => {
            return (
              <div className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`} ref={scrollRef}  key={index}>
                {
                  item?.type === 'file' ?

                    <div>
                      <div style={{position: "relative"}}>
                        <img
                          src={`${item.text}`}
                          className="w-[200px] h-[200px] object-cover rounded-[10px] mr-2"
                          alt=""
                        />
                        {
                          item.sender !== sellerId ? <div style={{ position: 'absolute', bottom: 0, right: 0, cursor: 'pointer' }}>
                          <MdDownloadForOffline size={30} style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%', }} fontSize='large' onClick={(e) => downloadMedia(e,item.text)} />
                        </div>: ''
                        }
                      </div>
                      <p className="text-[12px] text-[#000000d3] pt-1 text-end ">
                        {format(item.createdAt)}
                      </p>
                    </div>
                    :
                    <div>
                      <div
                        style={{ maxWidth: '90%', wordBreak: 'break-word', width: 'fit-content' }} className={`w-max p-2 rounded ${item.sender === sellerId ? "bg-green-300 ml-auto" : "bg-[#e18181]"
                          } text-black h-min`}
                      >
                        <p>{item.text}</p>
                      </div>

                      <p className="text-[12px] text-[#000000d3] pt-1">
                        {format(item.createdAt)}
                      </p>
                    </div>
                }



              </div>
            );
          })}
      </div>

      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            onChange={onFileChange}
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
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
