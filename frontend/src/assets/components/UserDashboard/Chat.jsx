import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Grid,
  GridItem,
  InputLeftElement,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  StackDivider,
  Divider,
  Badge,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import Conversation from "./Conversation";
import Message from "./Message";
import { io } from "socket.io-client";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);
  const start = user.iat;
  const end = user.exp;

  // if the token is expired then navigate to the login page
  if (Date.now() >= end * 1000) {
    toast({
      title: "session expired",
      description: "Your session has been expired. Please login again",
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "top-middle",
    });
    navigate("/login");
    localStorage.removeItem("token");
  }

  // load data into the messages tab
  // const loaddata = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/conversation/userId",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId: user.id,
  //         }),
  //       }
  //     );
  //     const prop = await response.json();
  //     // gets the data from the database by filtering only property from different users
  //     console.log(prop.data);
  //     setConversations(prop.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   loaddata();
  // }, []);

  //console.log(socket.current);

  useEffect(() => {
    // connecting to the socket server
    socket.current = io("ws://localhost:8900");

    // getting the message from the socket server and setting the arrival message
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // changing the current chat and loading the messages
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // load the socket server
  useEffect(() => {
    // sending the user id to the socket server
    socket.current.emit("addUser", user.id);

    // getting the users from the socket server
    socket.current.on("getUsers", (users) => {
      //console.log(users);
    });
  }, [user]);

  // useEffect(() => {
  //   socket?.on("w", (message) => {
  //     console.log(message);
  //   });
  // }, [socket]);

  // get and load the conversation
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/conversation/" + user.id
        );

        setConversations(res.data);
        //console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  // get and load the messages
  //console.log(currentChat);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/message/" + currentChat?._id
        );
        setMessages(res.data);
        //console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // send the message to the database and load the message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      convId: currentChat._id,
    };

    // finding the receiver id
    const receiverId = currentChat.members.find((member) => member !== user.id);

    // sending the message to the socket server
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    // send the message to the database
    try {
      const res = await axios.post(
        "http://localhost:4000/api/message",
        message
      );
      // sets the message to the message tab after sending the message using spread operator
      setMessages([...messages, res.data]);

      // set the new message to empty after sending the message
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // help to scroll down the message tab
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex
      minH={"100vh"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      w={"full"}
      as={"form"}
      //onSubmit={handleSubmit}
    >
      <Grid templateColumns="repeat(8, 1fr)" gap={4} w={"100%"} m={5}>
        {/* people page */}
        <GridItem colSpan={2} boxShadow={"lg"}>
          <Flex m={4} direction={"column"}>
            {/* search area  */}
            <InputGroup>
              <InputLeftElement pointerEvents="none" color={"black"}>
                <AiOutlineSearch />
              </InputLeftElement>
              <Input
                type="tel"
                //onChange={(e) => searchHandler(e)}
                placeholder="Search using ID or Name  "
                color={"black"}
                w={"100%"}
              />
            </InputGroup>
            {/* users area for conversation */}

            {conversations.map((c) => (
              <Flex direction={"column"} onClick={() => setCurrentChat(c)}>
                <Conversation conv={c} currentUser={user} />
              </Flex>
            ))}
          </Flex>
        </GridItem>

        {/* message panel  */}
        <GridItem colStart={3} colEnd={9} boxShadow={"lg"}>
          {currentChat ? (
            <>
              <Flex direction={"column"} h={600} overflow={"scroll"}>
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user.id} />
                  </div>
                ))}
              </Flex>

              {/* text area and send button */}
              <Flex m={4} gap={4} alignItems={"flex-end"}>
                <Textarea
                  placeholder="Message"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />

                <Button
                  leftIcon={<BsSend />}
                  colorScheme="teal"
                  variant="solid"
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </Flex>
            </>
          ) : (
            <Flex alignItems={"center"} direction={"column"}>
              <Image src={"public/images/chat.png"} />
              <Text
                fontSize={"2xl"}
                backgroundColor={"blue.200"}
                borderRadius={"lg"}
                color={"white"}
                w={"60%"}
                textAlign={"center"}
              >
                Select a conversation to start chatting
              </Text>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
}
