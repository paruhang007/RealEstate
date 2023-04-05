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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function ChangePassword() {
  return (
    <Flex
      minH={"100vh"}
      bg={useColorModeValue("gray.50", "gray.800")}
      w={"full"}
    >
      <Stack spacing={8} w={"full"}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Text fontSize={"lg"} color={"gray.600"}>
            Change your password
          </Text>

          <Stack spacing={4} mt={4}>
            <FormControl id="oldpassword" isRequired>
              <FormLabel>Old Password</FormLabel>
              <Input
                placeholder="old password"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
            </FormControl>
            <FormControl id="newpassword" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="new password"
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
            </FormControl>
            <FormControl id="confirmpassword" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                placeholder="confirm new password"
                _placeholder={{ color: "gray.500" }}
                type="password"
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
