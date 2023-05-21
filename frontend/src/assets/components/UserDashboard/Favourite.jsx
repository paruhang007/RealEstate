import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Image,
  Badge,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function Favourite() {
  //   const property = {
  //     imageUrl: "https://bit.ly/2Z4KKcF",
  //     imageAlt: "Rear view of modern home with pool",
  //     title: "Modern home in city center in the heart of historic Los Angeles",
  //     location: "Los Angeles, California",
  //     formattedPrice: "$1,900.00",
  //   };

  const [favouite, setFavourite] = useState([]);
  const [selectedFavoutite, setSelectedFavoutite] = useState(favouite);

  // set the property id to the state
  const [propID, setPropID] = useState("");

  const data = localStorage.getItem("token");
  const user = jwt_decode(data);

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  // load data into the table
  const loaddata = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/getFavourite/" + user.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const prop = await response.json();

      console.log(prop);
      setFavourite(prop);
      setSelectedFavoutite(prop);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  const handelDel = async () => {
    try {
      const response = await fetch("http://localhost:4000/deleteFav", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packId: propID,
        }),
      });
      const prop = await response.json();
      if (prop.status === "ok") {
        toast({
          title: "Removed From Favourites",
          description: "We've Removed this property from favourites.",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-middle",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-middle",
        });
      }
      loaddata();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      w={"full"}
      minH={"100vh"}
      bg={useColorModeValue("white", "gray.700")}
      direction={"column"}
    >
      <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"} ml={5}>
        Favourite Properties
      </Text>
      <SimpleGrid minChildWidth="200px" spacing="40px" m={5}>
        {selectedFavoutite.map((prop) => {
          return (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              borderColor={"blue.200"}
            >
              <Image src={prop.img} alt="property image" />

              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {prop.propName}
                </Box>

                <Box>
                  {prop.propPrice}
                  <Box
                    as="span"
                    color="gray.600"
                    fontSize="m"
                    fontWeight={"bold"}
                    ml={2}
                  >
                    {prop.selectedPayment}
                  </Box>
                </Box>

                <Flex
                  as="span"
                  color="gray.600"
                  fontSize="sm"
                  direction={"row"}
                  mt={2}
                  align="center"
                >
                  <GoLocation /> {prop.propDist} {prop.propMuni}{" "}
                  {prop.propStreet}
                </Flex>
              </Box>

              <Flex gap={5} justify={"center"} mb={3}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => {
                    setPropID(prop._id);
                    onOpen();
                  }}
                >
                  Remove
                </Button>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => {
                    navigate(`/detail/${prop.propUserId}/${prop.poprId}`);
                  }}
                >
                  View
                </Button>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Property </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to Remove the Property from favourite?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handelDel();
                onClose();
              }}
            >
              Delete
            </Button>

            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
