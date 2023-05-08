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

export default function AddService() {
  const [serviceDetails, setServiceDetails] = useState({});

  const [selectedServiceType, setSelectedServiceType] = useState("");

  // handel service type select change
  function handleServiceTypeSelectChange(event) {
    setSelectedServiceType(event.target.value);
  }

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);
  console.log(user);

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
                    I Agree To Listing Policy*
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
    </Flex>
  );
}
