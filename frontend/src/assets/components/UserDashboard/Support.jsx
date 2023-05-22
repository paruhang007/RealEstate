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

export default function Support() {
  const [serviceDetails, setServiceDetails] = useState({});

  const [selectedServiceType, setSelectedServiceType] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  // handel service type select change
  function handleServiceTypeSelectChange(event) {
    setSelectedServiceType(event.target.value);
  }

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

  // usestate for images
  const [images, setImages] = useState();

  // function for uploading images
  const uploadImage = async () => {
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

    try {
      const response = fetch("http://localhost:4000/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          imageLink,
          ...serviceDetails,
          serType: selectedServiceType,
          id: user.id,
        }),
      });
      setServiceDetails({
        serOname: "",
        serDesc: "",
      });
      setSelectedServiceType("");

      toast({
        title: " Successfully Sent To Admin",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-middle",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to Send ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
            Support and Help
          </Text>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
            Please select the type of Support you are seeking for
          </Text>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <Select
                placeholder="Service Type"
                isRequired
                value={selectedServiceType}
                onChange={handleServiceTypeSelectChange}
              >
                <option value="FeedBack">FeedBack</option>
                <option value="ReportUser">Report User</option>
                <option value="ReportService">Report Service</option>
                <option value="ReportProperty">Report Property</option>
                <option value="SystemBug">System Bug Report </option>
              </Select>
            </Box>
          </HStack>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel>Enter Your Full Name</FormLabel>
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

          <FormControl id="Description" isRequired mt={7}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Please describe your issue here along with the service/user/property id if you are reporting an issue"
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
