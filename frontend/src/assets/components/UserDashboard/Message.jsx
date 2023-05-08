import {
  Avatar,
  Flex,
  FormLabel,
  Text,
  Grid,
  GridItem,
  Stack,
  Textarea,
  Button,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <Flex direction={"column"} alignItems={own ? "flex-end" : "flex-start"}>
      <Flex m={4} direction={"column"}>
        <Flex direction={"row"} gap={4}>
          <Avatar size="sm" src={""} alt={"user image"}></Avatar>
          <FormLabel
            borderRadius="full"
            bg={own ? "teal.500" : "teal.100"}
            px="2"
            colorScheme="teal"
            textColor={own ? "white" : "black"}
            fontSize="l"
            mt={1}
          >
            {message.text}
          </FormLabel>
        </Flex>
        <FormLabel fontSize={12} ml={14}>
          {format(message.createdAt)}
        </FormLabel>
      </Flex>

      {/* <Flex m={4} direction={"column"} alignItems={"flex-end"} bg={"red.100"}>
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
      </Flex> */}
    </Flex>
  );
}
