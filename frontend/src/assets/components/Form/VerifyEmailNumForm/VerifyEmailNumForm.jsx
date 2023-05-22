import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function VerifyEmailNumForm() {
  const [pin, setPin] = useState("");

  const handlePinChange = (value) => {
    setPin(value);
  };

  const handleSubmit = async (event) => {
    console.log(pin);
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
          pin,
          email,
        }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
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
          username@mail.com
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
            onClick={handleSubmit}
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

        <Link to="/forpass">
          <Button
            bg={"blue.400"}
            color={"white"}
            justifyContent={"center"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={handleSubmit}
          >
            Back to resend OTP
          </Button>
        </Link>
      </Stack>
    </Flex>
  );
}
