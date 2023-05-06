import { Avatar, Flex, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation(conversation, currentUser) {
  const [user, setUser] = useState(null);
  //   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log(conversation.members);
    console.log(conversation.currentUser.id);
    //console.log(conversation.members.length);
    //const friendId = conversation.members.find((m) => m !== currentUser.id);
    const friendId =
      conversation.members &&
      conversation.members.find((m) => m !== currentUser.id);
    console.log(friendId);

    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:4000/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <Flex
      direction={"column"}
      mt={10}
      rounded={"lg"}
      _hover={{
        bg: "gray.300",
      }}
    >
      <Flex direction={"row"} alignItems={"center"} gap={4}>
        <Avatar size="lg" src={""} alt={"user image"}></Avatar>

        <FormLabel fontSize={18} fontWeight={"bold"}>
          First name
        </FormLabel>
      </Flex>
    </Flex>

    // <div className="conversation">
    //   <img
    //     className="conversationImg"
    //     src={
    //       user?.profilePicture
    //         ? PF + user.profilePicture
    //         : PF + "person/noAvatar.png"
    //     }
    //     alt=""
    //   />
    //   <span className="conversationName">{user?.username}</span>
    // </div>
  );
}
