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
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import Conversation from "./Conversation";
import Message from "./Message";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);
  // console.log(user);

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
        console.log(res.data);
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

    // const receiverId = currentChat.members.find(
    //   (member) => member !== user._id
    // );

    // socket.current.emit("sendMessage", {
    //   senderId: user._id,
    //   receiverId,
    //   text: newMessage,
    // });

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
          <Flex m={4} direction={"column"} bg={"red.100"}>
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
        <GridItem colStart={3} colEnd={7} boxShadow={"lg"} bg={"yellow.200"}>
          {currentChat ? (
            <>
              <Flex
                direction={"column"}
                bg={"green.100"}
                h={600}
                overflow={"scroll"}
              >
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user.id} />
                  </div>
                ))}
              </Flex>

              {/* text area and send button */}
              <Flex m={4} gap={4} alignItems={"flex-end"} bg={"red.100"}>
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
            <Text>Select a conversation</Text>
          )}
        </GridItem>

        {/* online area  */}
        <GridItem colStart={7} colEnd={9} boxShadow={"lg"}>
          <Flex m={4} direction={"column"}>
            <Text fontSize={"xl"} color={"gray.600"} fontWeight={"bold"} ml={5}>
              Online
            </Text>

            <Stack direction={"column"} mt={10}>
              <Flex direction={"row"} alignItems={"center"} gap={4}>
                <Avatar size="lg" src={""} alt={"user image"}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-15px"
                    left="25px"
                    colorScheme="green"
                    aria-label="remove Image"
                  />
                </Avatar>

                <FormLabel fontSize={18} fontWeight={"bold"}>
                  First name
                </FormLabel>
              </Flex>
            </Stack>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}
