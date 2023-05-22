import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState({});
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

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:4000/userGet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      });
      const data = await response.json();
      console.log(data.data);
      setUserData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // usestate for images
  const [images, setImages] = useState();

  const uploadImage = async () => {
    console.log("upload");
    const data = new FormData();
    data.append("file", images);
    data.append("upload_preset", "sie3kiby");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dooohxhvw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      return file.secure_url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageLink = await uploadImage();

    const object = {
      id: user.id,
      imageLink,
      ...userData,
    };
    console.log(object);

    try {
      const response = await fetch("http://localhost:4000/userEdit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...object,
        }),
      });
      const data = await response.json();
      console.log(data);
      // condition for checking the response from backend and showing the toast message accordingly
      if (!data.error) {
        toast({
          title: "Profile updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-middle",
        });
      } else {
        toast({
          title: "Profile updated unsuccessfully.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-middle",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: " Unexpected Error .",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-middle",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      w={"full"}
      bg={useColorModeValue("gray.50", "gray.800")}
      as={"form"}
      onSubmit={handleSubmit}
    >
      <Stack
        spacing={4}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={userData.userImg} alt={"user image"}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Flex gap={4}>
                <Input
                  type={"file"}
                  py={1}
                  onChange={(e) => {
                    setImages(e.target.files[0]);
                  }}
                ></Input>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Add Photo
                </Button>
              </Flex>
            </Center>
          </Stack>
        </FormControl>

        <FormControl id="firstName" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="First Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            defaultValue={userData.fname}
            onChange={(e) => {
              setUserData({ ...userData, fname: e.target.value });
            }}
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="Last Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            defaultValue={userData.lname}
            onChange={(e) => {
              setUserData({ ...userData, lname: e.target.value });
            }}
          />
        </FormControl>
        <FormControl id="Numbrer" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            _placeholder={{ color: "gray.500" }}
            type="text"
            defaultValue={userData.phone}
            onChange={(e) => {
              setUserData({ ...userData, phone: e.target.value });
            }}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            defaultValue={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </FormControl>

        <Stack spacing={6} direction={["column", "row"]} width="30%">
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
