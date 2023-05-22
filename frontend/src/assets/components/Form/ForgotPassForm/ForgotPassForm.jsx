import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormLabel,
  IconButton,
  Box,
  Center,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// const ForgotPasswordFormInputs = {
//   email: string
// };

export default function ForgotPassForm() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState("");
  const [pageState, setPageState] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");

  const [pin, setPin] = useState("");

  const handlePinChange = (value) => {
    setPin(value);
  };

  // creates otp and sends to email and sets pageState to 1
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    try {
      const response = await fetch("http://localhost:4000/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/jason",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: inputs,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "OTP sent successfully",
          description: "Please check your email for the OTP",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top",
        });
        setPageState(1);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // verifies otp and sets pageState to 2
  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/otpVerify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/jason",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: inputs,
          otp: pin,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "OTP match successfully",
          description: "Please check your email for the OTP",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top",
        });
        setPageState(2);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // resets password and sets pageState to 3
  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/changeUserPassEmail",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputs,
            newPass: newPass,
            newPassConf: newPassConf,
          }),
        }
      );
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
        navigate("/login");
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
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      as={"form"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {pageState === 0 && (
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            You&apos;ll get a code on your Email.
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your phone Email "
              _placeholder={{ color: "gray.500" }}
              type="email"
              onChange={(e) => setInputs(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              Request Reset
            </Button>
            <Link to="/verify">
              <Text color={"blue.400"}> Verify </Text>
            </Link>
          </Stack>
        </Stack>
      )}

      {pageState === 1 && (
        <Stack
          spacing={4}
          w={"full"}
          maxW={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Verify your Email
            </Heading>
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            We have sent code to your email
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            fontWeight="bold"
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {inputs}
          </Center>
          <FormControl>
            <Center>
              <HStack>
                <PinInput value={pin} onChange={handlePinChange}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              //onClick={(e) => setPageState(2)}
              onClick={handleVerify}
              color={"white"}
              justifyContent={"center"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Verify
            </Button>
          </Stack>

          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            If you have not received any OTP, click here to resend
          </Center>

          <Button
            bg={"blue.400"}
            color={"white"}
            justifyContent={"center"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={(e) => setPageState(0)}
          >
            Back to resend OTP
          </Button>
        </Stack>
      )}
      {pageState === 2 && (
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Enter new password
          </Heading>
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
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleReset}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      )}
    </Flex>
  );
}
