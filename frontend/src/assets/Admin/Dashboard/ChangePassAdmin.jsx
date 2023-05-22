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
import { useState } from "react";
import { useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function ChangePassAdmin() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");

  const navigate = useNavigate();

  // getting the token from local storage
  const data = localStorage.getItem("tokenAdmin");
  useEffect(() => {
    if (data) {
      navigate("/admindash/adminreset");
    }
    if (!data) {
      navigate("/loginadmin");
    }
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("service called");
    try {
      const response = await fetch("http://localhost:4000/changeAdminPass", {
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
    } catch (err) {
      console.log(err);
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
              <Input
                placeholder="new password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => setNewPass(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirmpassword" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                placeholder="confirm new password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => setNewPassConf(e.target.value)}
              />
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
