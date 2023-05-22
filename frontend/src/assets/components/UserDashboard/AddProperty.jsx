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
  IconButton,
  SimpleGrid,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineSoupKitchen } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export default function AddProperty() {
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { isloaded } = useLoadScript({
  //   googleMapApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  // });

  // if (!isloaded) return <div>"Loading Maps"</div>;
  // return <Map />;

  const [propertyDetails, setPropertyDetails] = useState({});

  const [selectedFor, setSelectedFor] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPropertyUnit, setSelectedPropertyUnit] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  // handle select change for "For"
  function handleForSelectChange(event) {
    setSelectedFor(event.target.value);
  }

  // handle select change for "Property Type"
  function handlePropertyTypeSelectChange(event) {
    setSelectedPropertyType(event.target.value);
  }

  // handle select change for "Unit Type"
  function handleForSelectUnit(event) {
    setSelectedPropertyUnit(event.target.value);
  }

  // handle select change for "Unit Type"
  function handleForPayment(event) {
    setSelectedPayment(event.target.value);
  }

  // usestate for images
  const [images, setImages] = useState();

  // handle image upload by link
  // async function addImageByLink(event) {
  //   event.preventDefault();
  //   console.log(imageUrl);
  //   try {
  //     const response = await post("http://localhost:4000/uplod_by_link", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         link: imageUrl,
  //       }),
  //     });
  //     const filename = await response.json();
  //     setImages(prev => {
  //       return [...prev, filename];
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setImageUrl('');

  // };

  // handle image upload by file

  // use state for checkbox
  const [checkboxValues, setCheckboxValues] = useState({
    Drainage: false,
    Drinking: false,
    parking: false,
    Dining: false,
    Kitchen: false,
    Bedroom: false,
    Earth: false,
  });

  // handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckboxValues({
      ...checkboxValues,
      [value]: checked,
    });
  };

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);
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

  // handle image upload by file
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
        const response = fetch("http://localhost:4000/addPack", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/jason",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            imageLink,
            ...propertyDetails,
            selectedFor,
            selectedPropertyType,
            selectedPropertyUnit,
            selectedPayment,
            checkboxValues,
            id: user.id,
          }),
        });
        setPropertyDetails({
          propName: "",
          propState: "",
          propDist: "",
          propMuni: "",
          propWard: "",
          propStreet: "",
          propFace: "",
          propRoad: "",
          propArea: "",
          propDesc: "",
          propPrice: "",
        });
        setSelectedFor("");
        setSelectedPropertyType("");
        setSelectedPropertyUnit("");
        setSelectedPayment("");
        setCheckboxValues({
          Drainage: false,
          Drinking: false,
          parking: false,
          Dining: false,
          Kitchen: false,
          Bedroom: false,
          Earth: false,
        });

        toast({
          title: "Property added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-middle",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to add Property ",
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
            Add property
          </Text>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
            About Property
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>Property Name / Title</FormLabel>
                <Input
                  type="text"
                  value={propertyDetails.propName}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propName: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
          </HStack>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <Select
                placeholder="For"
                isrequired
                value={selectedFor}
                onChange={handleForSelectChange}
              >
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
                <option value="Lease">Lease</option>
              </Select>
            </Box>
            <Box>
              <Select
                placeholder="Property Type"
                isrequired
                value={selectedPropertyType}
                onChange={handlePropertyTypeSelectChange}
              >
                <option value="Land">Land</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Office space">Office space</option>
                <option value="Shop space">Shop space</option>
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
                  value={propertyDetails.propState}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propState: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="district" isRequired>
                <FormLabel>District </FormLabel>
                <Input
                  value={propertyDetails.propDist}
                  type="text"
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propDist: e.target.value,
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
                  value={propertyDetails.propMuni}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propMuni: e.target.value,
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
                  value={propertyDetails.propWard}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propWard: e.target.value,
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
                  value={propertyDetails.propStreet}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propStreet: e.target.value,
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
          {/* <Flex gap={4}>
            <Input type='text' placeholder={'Add using a link....'} onChange={(e) => setImageUrl(e.target.value)} />
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={addImageByLink}
            >Add Photo</Button>
          </Flex> */}

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
            Property Higlights
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="face" isRequired>
                <FormLabel>Facing</FormLabel>
                <Input
                  type="text"
                  value={propertyDetails.propFace}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propFace: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="road" isRequired>
                <FormLabel>Road Size </FormLabel>
                <Input
                  type="text"
                  value={propertyDetails.propRoad}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propRoad: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="area" isRequired>
                <FormLabel>Area</FormLabel>
                <Input
                  type="text"
                  placeholder="Mention Unit"
                  value={propertyDetails.propArea}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propArea: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <Select
                placeholder="Unit Type"
                isrequired
                mt={7}
                value={selectedPropertyUnit}
                onChange={handleForSelectUnit}
              >
                <option value="Hilly Area">Hilly Area </option>
                <option value="Terai Area">Terai Area </option>
                <option value="Standard sq meter/ft">
                  Standard sq meter/ft{" "}
                </option>
              </Select>
            </Box>
          </HStack>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Amenities and Featurees
          </Text>

          <SimpleGrid mt={5} columns={{ sm: 3, md: 4 }}>
            <Checkbox
              value="Drainage"
              isChecked={checkboxValues.Drainage}
              onChange={handleCheckboxChange}
            >
              Drainage
            </Checkbox>
            <Checkbox
              value="Drinking"
              isChecked={checkboxValues.Drinking}
              onChange={handleCheckboxChange}
            >
              Drinking Water
            </Checkbox>
            <Checkbox
              value="parking"
              isChecked={checkboxValues.parking}
              onChange={handleCheckboxChange}
            >
              Parking
            </Checkbox>
            <Checkbox
              value="Dining"
              isChecked={checkboxValues.Dining}
              onChange={handleCheckboxChange}
            >
              Dining Room
            </Checkbox>
            <Checkbox
              value="Kitchen"
              isChecked={checkboxValues.Kitchen}
              onChange={handleCheckboxChange}
            >
              Kitchen
            </Checkbox>
            <Checkbox
              value="Bedroom"
              isChecked={checkboxValues.Bedroom}
              onChange={handleCheckboxChange}
            >
              Bedroom
            </Checkbox>
            <Checkbox
              value="Earth"
              isChecked={checkboxValues.Earth}
              onChange={handleCheckboxChange}
            >
              Earthquake Resistance
            </Checkbox>
          </SimpleGrid>

          <FormControl id="oldpassword" isRequired mt={7}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              _placeholder={{ color: "gray.500" }}
              type="text"
              h={25}
              value={propertyDetails.propDesc}
              onChange={(e) =>
                setPropertyDetails((prev) => ({
                  ...prev,
                  propDesc: e.target.value,
                }))
              }
            />
          </FormControl>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
            Payment Details
          </Text>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="price" isRequired>
                <FormLabel>Enter Price </FormLabel>
                <Input
                  type="text"
                  value={propertyDetails.propPrice}
                  onChange={(e) =>
                    setPropertyDetails((prev) => ({
                      ...prev,
                      propPrice: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <Select
                placeholder="Payment"
                isrequired
                mt={7}
                value={selectedPayment}
                onChange={handleForPayment}
              >
                <option value="Per Month">Per Month </option>
                <option value="Per Year">Per Year </option>
                <option value="For Sale">For Sale </option>
              </Select>
            </Box>
          </HStack>

          <Stack spacing={4} mt={4}>
            #
            <Box mt={5}>
              <CheckboxGroup colorScheme="green">
                <Stack spacing={[5]} direction={["column", "row"]}>
                  <Checkbox value="policy" size="md">
                    I Agree To Listing
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
