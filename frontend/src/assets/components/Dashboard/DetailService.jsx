import {
  Flex,
  Box,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Select,
  Grid,
  GridItem,
  Button,
  FormControl,
  FormLabel,
  SimpleGrid,
  Image,
  Badge,
  IconButton,
  RadioGroup,
  VStack,
  Radio,
  Stack,
  Divider,
  Icon,
  chakra,
  useColorModeValue,
  List,
  ListItem,
  Container,
  StackDivider,
  Center,
  Avatar,
  Link,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { IoBedOutline } from "react-icons/io5";
import { MdDinnerDining } from "react-icons/md";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiEarthquakeLine } from "react-icons/ri";
import { MdOutlineSoupKitchen } from "react-icons/md";
import { TbParking } from "react-icons/tb";
import { GiWaterfall } from "react-icons/gi";
import { MdFavoriteBorder } from "react-icons/md";
import axios from "axios";

export default function SearchProp() {
  // use state for the product
  const [product, setProduct] = useState({});

  // use state for the user
  const [userData, setUserData] = useState({});

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = data ? jwt_decode(data) : "";

  // use state for the similar properties
  const [similarProp, setSimilarProp] = useState([]);
  const [selectedSimilarProp, setSelectedSimilarProp] = useState(similarProp);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  // getting the id and packId from the url
  const { id, servId } = useParams();

  // loading the data from the database for service
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:4000/getService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          servId,
        }),
      });
      const data = await response.json();
      // console.log(data);
      setProduct(data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [id, servId]);

  // loading the data from the database for message tab
  const loadData2 = async () => {
    try {
      const response = await fetch("http://localhost:4000/userGet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      console.log(data.data);
      setUserData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData2();
  }, []);

  // loading the data from the database for similar properties
  const loadData3 = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAllService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const prop = await response.json();
      console.log(prop.data);
      setSimilarProp(prop.data);
      console.log(similarProp);
      setSelectedSimilarProp(prop.data);
      console.log(selectedSimilarProp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData3();
  }, []);

  // when the user clicks on the Message button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = localStorage.getItem("token");
    if (data) {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/conversation/" + user.id + "/" + id
        );
        navigate("/userchat");
      } catch (err) {
        console.log(err);
      }
    } else {
      onOpen();
    }
  };

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={2} py={5} px={10} bg="gray.100">
      <GridItem colStart={1} colEnd={6}>
        <Flex
          m={5}
          minH={"100"}
          borderWidth="1px"
          borderColor={"black.200"}
          bg={"#ffffff"}
          direction={"column"}
          p={10}
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Flex alignItems="center">
                <Heading
                  lineHeight={1.1}
                  fontWeight={"bold"}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {product.serName}
                </Heading>
                <Spacer />
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="favourite"
                  icon={<MdFavoriteBorder />}
                  onClick={() => {
                    const data = localStorage.getItem("token");
                    if (data) {
                      alert("Added to favourites");
                    } else {
                      onOpen();
                    }
                  }}
                />
              </Flex>

              <Modal
                closeOnOverlayClick={true}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader as={Flex} justifyContent={"center"}>
                    Please Login or Signup to add Property to Favourites
                  </ModalHeader>
                  <ModalCloseButton />

                  <ModalFooter>
                    <Flex w={"full"} justifyContent={"center"} gap={5}>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                      <Button onClick={() => navigate("/signup")}>
                        Signup
                      </Button>
                    </Flex>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Flex
                as="span"
                color="gray.600"
                fontSize="l"
                direction={"row"}
                mt={2}
                align="center"
                fontWeight={"bold"}
              >
                <GoLocation /> {product.serState},{product.serDist},
                {product.serMuni},{product.serWard},,{product.serStreet}
              </Flex>

              <Box display="flex" alignItems="baseline" mt={3} gap={3}>
                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                >
                  {product.selectedServiceType}
                </Badge>

                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                >
                  Property ID: {product._id}
                </Badge>

                <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="teal"
                  fontSize="l"
                >
                  {product.verifiedService}
                </Badge>
              </Box>
            </Box>

            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={product.img}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Contact Information
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Owner Name :
                    </Text>{" "}
                    {product.serOname}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Phone Number :
                    </Text>{" "}
                    {product.serPhone}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Email :
                    </Text>{" "}
                    {product.serEmail}
                  </ListItem>
                </List>
              </Box>

              <Box spacing={{ base: 4, sm: 6 }}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Products and Services
                </Text>

                <Text fontSize={"lg"}>{product.serProd}</Text>
              </Box>

              <Box spacing={{ base: 4, sm: 6 }}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Description of the property
                </Text>

                <Text fontSize={"lg"}>{product.serDesc}</Text>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      </GridItem>

      {/* second portion of the page  */}

      <GridItem colStart={6} colEnd={8} minH={"500"} justify={"center"}>
        <Flex
          m={5}
          minH={"300"}
          direction={"column"}
          borderWidth="1px"
          borderColor={"black.200"}
          bg={"#ffffff"}
          p={5}
          as={"form"}
          onSubmit={handleSubmit}
        >
          {/* Portion for the owner of the post  */}
          <Center py={6}>
            <Box
              maxW={"320px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={6}
              textAlign={"center"}
            >
              <Avatar
                size={"xl"}
                src={userData.userImg}
                alt={"Avatar Alt"}
                mb={4}
                pos={"relative"}
              />
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {userData.fname} {userData.lname}
              </Heading>
              <Text fontWeight={600} color={"gray.500"} mb={4}>
                {userData.email}
              </Text>

              <Stack mt={8} direction={"row"} spacing={4}>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                  type="submit"
                >
                  Message
                </Button>
              </Stack>
            </Box>
          </Center>

          {/* portion for Related Properties */}
          <Box
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Similar Services
            </Heading>

            {/* similar properties */}

            {selectedSimilarProp
              .filter((prop) => {
                return (
                  (prop.service.selectedServiceType ===
                    product.selectedServiceType ||
                    prop.service.serDist === product.serDist ||
                    prop.service.serMuni === product.serMuni ||
                    prop.service.serStreet === product.serStreet) &&
                  prop.service._id !== product._id
                );
              })
              .map((prop) => {
                return (
                  <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    borderColor={"blue.200"}
                    mt={3}
                  >
                    <Image
                      src={prop.service.img}
                      alt="house img"
                      onClick={() => {
                        console.log(prop._id);
                        console.log(prop.service._id);
                        navigate(
                          `/detailservice/${prop._id}/${prop.service._id}`
                        );
                      }}
                    />

                    <Box p="6">
                      <Flex align={"center"}>
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {prop.service.serName}
                        </Box>
                      </Flex>

                      <Flex
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        direction={"row"}
                        mt={2}
                        align="center"
                      >
                        <GoLocation /> {prop.service.serState},{" "}
                        {prop.service.serDist}, {prop.service.serStreet}
                      </Flex>

                      <Box display="flex" alignItems="baseline" m={3} gap={2}>
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          {prop.service.selectedServiceType}
                        </Badge>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}
