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

export default function Chat() {
  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);
  console.log(user);

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

            <Stack direction={"column"} mt={10}>
              <Flex direction={"row"} alignItems={"center"} gap={4}>
                <Avatar size="lg" src={""} alt={"user image"}></Avatar>

                <FormLabel fontSize={18} fontWeight={"bold"}>
                  First name
                </FormLabel>
              </Flex>
            </Stack>
          </Flex>
        </GridItem>

        {/* message panel  */}
        <GridItem colStart={3} colEnd={7} boxShadow={"lg"}>
          <Flex direction={"column"} bg={"yellow.100"} minH={700}>
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
                  bg="teal.300"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                  mt={1}
                >
                  right message
                </FormLabel>
              </Flex>
              <FormLabel fontSize={12} ml={14}>
                First name
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

            {/* text area and send button */}
            <Flex
              m={4}
              direction={"row"}
              gap={4}
              mt={330}
              alignItems={"center"}
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
