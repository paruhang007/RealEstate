import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  Select,
  CheckboxGroup,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

export default function AddService() {
  const [serviceDetails, setServiceDetails] = useState({});

  const [selectedServiceType, setSelectedServiceType] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // handel service type select change
  function handleServiceTypeSelectChange(event) {
    setSelectedServiceType(event.target.value);
  }

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);
  console.log(user);
  const start = user.iat;
  const end = user.exp;

  // if the token is expired then navigate to the login page
  if (Date.now() >= end * 1000) {
    toast({
      title: "session expired",
      description: "Your session has been expired. Please login again",
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "top-middle",
    });
    navigate("/login");
    localStorage.removeItem("token");
  }

  // usestate for images
  const [images, setImages] = useState();

  // function for uploading images
  const uploadImage = async () => {
    console.log("upload");
    const data = new FormData();
    data.append("file", images);
    data.append("upload_preset", "sie3kiby");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dooohxhvw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();

      return file.secure_url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageLink = await uploadImage();
    if (imageLink) {
      try {
        const response = fetch("http://localhost:4000/addService", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            imageLink,
            ...serviceDetails,
            selectedServiceType,
            id: user.id,
          }),
        });
        setServiceDetails({
          serName: "",
          serState: "",
          serDist: "",
          serMuni: "",
          serWard: "",
          serStreet: "",
          serOname: "",
          serPhone: "",
          serEmail: "",
          serProd: "",
          serDesc: "",
        });
        setSelectedServiceType("");

        toast({
          title: "Service added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-middle",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to add Service ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

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
            Add Service
          </Text>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
            About Service
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="firstName" i>
                <FormLabel>Service Name / Title</FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serName}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serName: e.target.value,
                    }))
                  }
                  isRequired
                />
              </FormControl>
            </Box>
          </HStack>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <Select
                placeholder="Service Type"
                isRequired
                value={selectedServiceType}
                onChange={handleServiceTypeSelectChange}
              >
                <option value="Hardware">Hardware Store</option>
                <option value="Plumber">Plumber</option>
                <option value="Constructions">Constructions</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpet">Carpet Fitting</option>
                <option value="Marbles">Marbles and Tiles</option>
                <option value="Furniture">Furniture</option>
                <option value="Solar">Solar Heaters</option>
                <option value="Metal">Metal Work</option>
                <option value="Paint">Paint Store</option>
                <option value="Cleaning">Cleaning Service</option>
                <option value="Interior">Interior Design</option>
              </Select>
            </Box>
          </HStack>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Property Location
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="state" isRequired>
                <FormLabel>State/Province</FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serState}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serState: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="district" isRequired>
                <FormLabel>District </FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serDist}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serDist: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="municipality" isRequired>
                <FormLabel>Municipality</FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serMuni}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serMuni: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl id="ward" isRequired>
                <FormLabel>Ward Number</FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serWard}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serWard: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="tol" isRequired>
                <FormLabel>Area / Street name</FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serStreet}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serStreet: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
          </HStack>

          {/* for uploding images  */}
          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Photos
          </Text>

          <Box mt={5}>
            <Input
              type={"file"}
              py={1}
              onChange={(e) => {
                setImages(e.target.files[0]);
              }}
            ></Input>
          </Box>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Contact Information
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel>Owner name</FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serOname}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serOname: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="number" isRequired>
                <FormLabel>Phone Number </FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serPhone}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serPhone: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  value={serviceDetails.serEmail}
                  onChange={(e) =>
                    setServiceDetails((prev) => ({
                      ...prev,
                      serEmail: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
          </HStack>

          <FormControl id="Description" isRequired mt={7}>
            <FormLabel>Products and Services</FormLabel>
            <Textarea
              placeholder="Description"
              _placeholder={{ color: "gray.500" }}
              type="text"
              h={25}
              value={serviceDetails.serProd}
              onChange={(e) =>
                setServiceDetails((prev) => ({
                  ...prev,
                  serProd: e.target.value,
                }))
              }
            />
          </FormControl>

          <FormControl id="Description" isRequired mt={7}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              _placeholder={{ color: "gray.500" }}
              type="text"
              h={25}
              value={serviceDetails.serDesc}
              onChange={(e) =>
                setServiceDetails((prev) => ({
                  ...prev,
                  serDesc: e.target.value,
                }))
              }
            />
          </FormControl>

          <Stack spacing={4} mt={4}>
            <Box mt={5}>
              <CheckboxGroup colorScheme="green">
                <Stack spacing={[5]} direction={["column", "row"]}>
                  <Checkbox value="policy" size="md">
                    I Agree To Listing{" "}
                    <Text
                      onClick={() => {
                        onOpen();
                      }}
                      color="blue.500"
                    >
                      Policy*
                    </Text>
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>
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
                Submit
              </Button>
            </Stack>
            <Stack pt={6}></Stack>
          </Stack>
        </Box>
      </Stack>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Flex w={"auto"}>
          <ModalContent>
            <ModalHeader>
              Terms and Plolicies for Listing Property and Services
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="1rem">
                <UnorderedList>
                  <ListItem>
                    Accurate and Complete Information: Users are responsible for
                    providing accurate, up-to-date, and complete information
                    about the properties and services they list. This includes
                    details such as property descriptions, specifications,
                    location, pricing, availability, service descriptions,
                    service scope, and any other relevant information.
                  </ListItem>
                  <ListItem>
                    Compliance with Laws and Regulations: Users must comply with
                    all applicable laws, regulations, and licensing requirements
                    related to the listing and provision of properties and
                    services. This includes adherence to real estate laws,
                    property disclosure requirements, zoning regulations,
                    licensing requirements for specific services, and any other
                    relevant legal obligations.
                  </ListItem>
                  <ListItem>
                    Intellectual Property Rights: Users must have the necessary
                    rights and permissions to list any content related to the
                    properties and services. It is prohibited to infringe upon
                    the intellectual property rights of others, including
                    copyrights, trademarks, or any other proprietary
                    information.
                  </ListItem>
                  <ListItem>
                    Quality and Safety: Listings should meet quality and safety
                    standards. Users should ensure that the properties and
                    services listed are in good condition, meet relevant safety
                    regulations, and adhere to industry standards.
                  </ListItem>
                  <ListItem>
                    Privacy and Data Protection: The user information is
                    collected, stored, and used in accordance with applicable
                    privacy laws and regulations.
                  </ListItem>
                  <ListItem>
                    Liability Limitations: Users enter into transactions at
                    their own risk and should exercise due diligence in their
                    decision-making process. The user is solely responsible for
                    any risks associated with the use of the platform.
                  </ListItem>
                </UnorderedList>
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                onClick={onClose}
                backgroundColor={"grey.100"}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Flex>
      </Modal>
    </Flex>
  );
}
