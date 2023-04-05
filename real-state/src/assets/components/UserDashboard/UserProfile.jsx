import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function UserProfile() {
  return (
    <Flex
      minH={"100vh"}
      w={"full"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="30%">Change Image</Button>
            </Center>
          </Stack>
        </FormControl>
        <HStack>
          <Box>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
        </HStack>

        <FormControl id="firstName" isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            placeholder="First Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="lastName" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            placeholder="Last Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="Numbrer" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>

        <Stack spacing={6} direction={["column", "row"]} width="30%">
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
