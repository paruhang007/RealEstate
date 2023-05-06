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
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import Conversation from "./Conversation";

export default function Chat() {
  const [conversations, setConversations] = useState([]);

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

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/conversation/" + user.id
        );

        setConversations(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

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
              <Conversation conversation={c} currentUser={user} />
            ))}
          </Flex>
        </GridItem>

        {/* message panel  */}
        <GridItem colStart={3} colEnd={7} boxShadow={"lg"} bg={"yellow.200"}>
          <Flex
            direction={"column"}
            bg={"green.100"}
            h={600}
            overflow={"scroll"}
          >
            {/* person 1 message */}
            <Flex m={4} direction={"column"}>
              <Flex direction={"row"} gap={4}>
                <Avatar size="sm" src={""} alt={"user image"}></Avatar>
                <FormLabel
                  borderRadius="full"
                  bg="teal.300"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                  mt={1}
                >
                  hello world
                </FormLabel>
              </Flex>
              <FormLabel fontSize={12} ml={14}>
                First name
              </FormLabel>
            </Flex>

            {/* person 2 msg */}
            <Flex
              m={4}
              direction={"column"}
              alignItems={"flex-end"}
              bg={"red.100"}
            >
              <Flex direction={"row"} gap={4} bg={"blue.100"}>
                <Avatar size="sm" src={""} alt={"user image"}></Avatar>
                <FormLabel
                  borderRadius="full"
                  bg="teal.100"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                  mt={1}
                >
                  right message
                </FormLabel>
              </Flex>
              <FormLabel fontSize={12} ml={14}>
                30 sec ago
              </FormLabel>
            </Flex>

            <Flex m={4} direction={"column"}>
              <Flex direction={"row"} gap={4}>
                <Avatar size="sm" src={""} alt={"user image"}></Avatar>
                <FormLabel
                  borderRadius="full"
                  bg="teal.300"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                  mt={1}
                >
                  hello world
                </FormLabel>
              </Flex>
              <FormLabel fontSize={12} ml={14}>
                First name
              </FormLabel>
            </Flex>

            {/* person 2 msg */}
            <Flex
              m={4}
              direction={"column"}
              alignItems={"flex-end"}
              bg={"red.100"}
            >
              <Flex direction={"row"} gap={4} bg={"blue.100"}>
                <Avatar size="sm" src={""} alt={"user image"}></Avatar>
                <FormLabel
                  borderRadius="full"
                  bg="teal.100"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                  mt={1}
                >
                  right message
                </FormLabel>
              </Flex>
              <FormLabel fontSize={12} ml={14}>
                30 sec ago
              </FormLabel>
            </Flex>

            <Flex m={4} direction={"column"}>
              <Flex direction={"row"} gap={4}>
                <Avatar size="sm" src={""} alt={"user image"}></Avatar>
                <FormLabel
                  borderRadius="full"
                  bg="teal.300"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                  mt={1}
                >
                  hello world
                </FormLabel>
              </Flex>
              <FormLabel fontSize={12} ml={14}>
                First name
              </FormLabel>
            </Flex>
          </Flex>
          {/* text area and send button */}
          <Flex
            m={4}
            gap={4}
            alignItems={"flex-end"}
            //justifySelf={"flex-end"}
            //justifyItems={"flex-end"}
            bg={"red.100"}
          >
            <Textarea
              placeholder="Message"
              _placeholder={{ color: "gray.500" }}
              type="text"
              //onChange={(e) => setSerProd(e.target.value)}
            />

            <Button leftIcon={<BsSend />} colorScheme="teal" variant="solid">
              Send
            </Button>
          </Flex>
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
