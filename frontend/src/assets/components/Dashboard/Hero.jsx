import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={
        "url(https://imgdrop.imgix.net/1afd9b4404c54cd5bd4d3737eec0d70d.jpg)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Find yourselves amazing properties Here with us at GharJagga
          </Text>
          <Stack direction={"row"}>
            <Button
              bg={"blue.400"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "blue.500" }}
              onClick={() => navigate("/search")}
            >
              Show Properties
            </Button>
            <Button
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
              onClick={() => navigate("/service")}
            >
              Show Service
            </Button>

            {/* search bar */}
          </Stack>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color={"white"}>
              <AiOutlineSearch />
            </InputLeftElement>
            <Input type="tel" placeholder="Search..." color={"white"} />
          </InputGroup>

          <Stack></Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
