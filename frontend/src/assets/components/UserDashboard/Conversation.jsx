import { Avatar, Flex, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation(conv, currentUser) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //console.log(conv.conv);
    // console.log(conv.currentUser);
    // console.log(conv.conv.members);
    //const friendId = conversation.members.find((m) => m !== currentUser.id);
    const friendId = conv.conv.members.find((m) => m !== conv.currentUser.id);
    // console.log(friendId);

    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:4000/api/conversation/users/" + friendId
        );
        setUser(res.data.data);
        //console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conv]);

  return (
    <Flex
      direction={"row"}
      alignItems={"center"}
      gap={4}
      mt={7}
      rounded={"lg"}
      _hover={{
        bg: "gray.300",
      }}
    >
      <Avatar size="lg" src={user?.userImg} alt={"user image"}></Avatar>

      <FormLabel fontSize={18} fontWeight={"bold"}>
        {user?.fname} {user?.lname}
      </FormLabel>
    </Flex>
  );
}
