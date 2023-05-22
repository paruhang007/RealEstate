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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/changeUserPass", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          oldPass: oldPass,
          newPass: newPass,
          newPassConf: newPassConf,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!data.error) {
        toast({
          title: "Password updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-middle",
        });
      } else {
        toast({
          title: "Password does not match .",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-middle",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: " Unexpected Error .",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-middle",
      });
    }
  }

  return (
    <Flex
      minH={"100vh"}
      bg={useColorModeValue("gray.50", "gray.800")}
      w={"full"}
      as={"form"}
      onSubmit={handleSubmit}
    >
      <Stack spacing={8} w={"full"}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"}>
            Let's change your password
          </Text>

          <Stack spacing={4} mt={4}>
            <FormControl id="oldpassword" isRequired>
              <FormLabel>Old Password</FormLabel>

              <Input
                placeholder="old password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => setOldPass(e.target.value)}
              />
            </FormControl>
            <FormControl id="newpassword" isRequired>
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="new password"
                  _placeholder={{ color: "gray.500" }}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmpassword" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="confirm new password"
                  _placeholder={{ color: "gray.500" }}
                  onChange={(e) => setNewPassConf(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                update
              </Button>
            </Stack>
            <Stack pt={6}></Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
