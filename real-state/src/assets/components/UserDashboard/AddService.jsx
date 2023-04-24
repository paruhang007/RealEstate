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
import jwt_decode from 'jwt-decode';


export default function AddService() {

    const [serName, setSerName] = useState("");
    const [serState, setSerState] = useState("");
    const [serDist, setSerDist] = useState("");
    const [serMuni, setSerMuni] = useState("");
    const [serWard, setSerWard] = useState("");
    const [serStreet, setSerStreet] = useState("");
    const [serOname, setSerOname] = useState("");
    const [serPhone, setSerPhone] = useState("");
    const [serEmail, setSerEmail] = useState("");
    const [serProd, setSerProd] = useState("");
    const [serDesc, setSerDesc] = useState("");

    const [selectedServiceType, setSelectedServiceType] = useState('');

    // handel service type select change
    function handleServiceTypeSelectChange(event) {
        setSelectedServiceType(event.target.value);
    }

    // getting the token from local storage
    const data = localStorage.getItem('token');
    // decoding the token which is actually holding the user id  
    const user = jwt_decode(data);
    console.log(user);

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const response = fetch("http://localhost:5000/addService", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    serName,
                    serState,
                    serDist,
                    serMuni,
                    serWard,
                    serStreet,
                    serOname,
                    serPhone,
                    serEmail,
                    serProd,
                    serDesc,
                    selectedServiceType,
                    id: user.id,
                }),

            })
        }

        catch (error) {
            console.log(error);
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
                    <HStack gap={5} align={"center"} mt={5} >
                        <Box>
                            <FormControl id="firstName" i>
                                <FormLabel>Service Name / Title</FormLabel>
                                <Input type="text" onChange={(e) => setSerName(e.target.value)} isRequired />
                            </FormControl>
                        </Box>
                    </HStack>

                    <HStack gap={5} align={"center"} mt={5}>

                        <Box>
                            <Select placeholder="Service Type" isRequired value={selectedServiceType} onChange={handleServiceTypeSelectChange}>
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
                                <Input type="text" onChange={(e) => setSerState(e.target.value)} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="district" isRequired>
                                <FormLabel>District </FormLabel>
                                <Input type="text" onChange={(e) => setSerDist(e.target.value)} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="municipality" isRequired>
                                <FormLabel>Municipality</FormLabel>
                                <Input type="text" onChange={(e) => setSerMuni(e.target.value)} />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl id="ward" isRequired>
                                <FormLabel>Ward Number</FormLabel>
                                <Input type="text" onChange={(e) => setSerWard(e.target.value)} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="tol" isRequired>
                                <FormLabel>Area / Street name</FormLabel>
                                <Input type="text" onChange={(e) => setSerStreet(e.target.value)} />
                            </FormControl>
                        </Box>
                    </HStack>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
                        Contact Information
                    </Text>
                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="name" isRequired>
                                <FormLabel>Owner name</FormLabel>
                                <Input type="text" onChange={(e) => setSerOname(e.target.value)} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="number" isRequired>
                                <FormLabel>Phone Number </FormLabel>
                                <Input type="text" onChange={(e) => setSerPhone(e.target.value)} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" onChange={(e) => setSerEmail(e.target.value)} />
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
                            onChange={(e) => setSerProd(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="Description" isRequired mt={7}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Description"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            h={25}

                            onChange={(e) => setSerDesc(e.target.value)}
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
