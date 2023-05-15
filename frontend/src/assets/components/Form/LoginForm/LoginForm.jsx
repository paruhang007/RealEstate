import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useToast } from "@chakra-ui/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toast = useToast();

  // const submitHandler = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:4000/login", {
  //       method: "POST",
  //       crossDomain: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();

  //       if (data.status === "ok") {
  //         window.localStorage.setItem("token", data.data);
  //         navigate("/");
  //       } else {
  //         //Display an error toast
  //         toast({
  //           title: "Login failed. Please check your credentials.",
  //           status: "error",
  //           duration: 3000,
  //           isClosable: true,
  //           position: "top-middle",
  //         });
  //       }
  //     } else {
  //       // Display an error toast
  //       toast({
  //         title: "Something went wrong. Please try again later.",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //         position: "top-middle",
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     // Display an error toast
  //     toast({
  //       title: "An error occurred. Please try again later.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //       position: "top-middle",
  //     });
  //   }
  // };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.status === "ok") {
          window.localStorage.setItem("token", data.data);
          navigate("/");
        }
      } else {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error;

        // Handle the error message
        console.log(errorMessage);
        toast({
          title: errorMessage,
          //status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-middle",
        });
      }
    } catch (err) {
      console.log(err);
      // Handle the network or other errors
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link to="/forpass">
                    {" "}
                    <Text color={"blue.400"}> Forgot password? </Text>{" "}
                  </Link>
                </Stack>
                <Text fontSize={"lg"} color={"gray.600"} display="flex">
                  Dont have an Account ?{" "}
                  <Link to="/signup">
                    <Text color={"blue.400"}> Sign Up </Text>
                  </Link>
                </Text>

                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
