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

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


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

    // for viewng the data from the database 
    const navigate = useNavigate();
    const [service, setService] = useState({});


    const { id, servId } = useParams();

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5000/getService", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id,
                    "servId": servId
                }),
            });
            const data = await response.json();
            console.log(data.data[0]);
            setService(data.data[0]);
        }

        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    // usestate for images 
    const [images, setImages] = useState();

    const uploadImage = async () => {
        console.log("upload");
        const data = new FormData();
        data.append('file', images);
        data.append('upload_preset', 'sie3kiby');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dooohxhvw/image/upload', {
                method: 'POST',
                body: data
            })
            const file = await res.json();

            return file.secure_url;

        }
        catch (error) {
            console.log(error);
            return null;
        }

    }




    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageLink = await uploadImage();
        console.log(service);
        const object = {
            id,
            servId,
            imageLink,
            ...service,
        }
        console.log(object);
        if (imageLink) {
            try {
                const response = await fetch("http://localhost:5000/editService", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                        ...object
                    }),

                })
                const data = await response.json();
                console.log(data);
            }

            catch (error) {
                console.log(error);
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
                    <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                            bg: "blue.500",
                        }}
                        onClick={() => navigate("/myservices")}
                    >
                        Back
                    </Button>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
                        Edit Service
                    </Text>
                    <HStack gap={5} align={"center"} mt={5} >
                        <Box>
                            <FormControl id="firstName" i>
                                <FormLabel>Service Name / Title</FormLabel>
                                <Input type="text" defaultValue={service.serName} onChange={(e) => {
                                    setService({ ...service, serName: e.target.value });
                                }} isRequired />
                            </FormControl>
                        </Box>
                    </HStack>

                    <HStack gap={5} align={"center"} mt={5}>

                        <Box>
                            <Select placeholder="Service Type" isrequired value={selectedServiceType} onChange={(e) => {
                                setService({ ...service, selectedServiceType: e.target.value })
                            }}>
                                <option value="Hardware" selected={service.selectedServiceType === 'Hardware'}>Hardware Store</option>
                                <option value="Plumber" selected={service.selectedServiceType === 'Plumber'}>Plumber</option>
                                <option value="Constructions" selected={service.selectedServiceType === 'Constructions'}>Constructions</option>
                                <option value="Electrician" selected={service.selectedServiceType === 'Electrician'}>Electrician</option>
                                <option value="Carpet" selected={service.selectedServiceType === 'Carpet'}>Carpet Fitting</option>
                                <option value="Marbles" selected={service.selectedServiceType === 'Marbles'}>Marbles and Tiles</option>
                                <option value="Furniture" selected={service.selectedServiceType === 'Furniture'}>Furniture</option>
                                <option value="Solar" selected={service.selectedServiceType === 'Solar'}>Solar Heaters</option>
                                <option value="Metal" selected={service.selectedServiceType === 'Metal'}>Metal Work</option>
                                <option value="Paint" selected={service.selectedServiceType === 'Paint'}>Paint Store</option>
                                <option value="Cleaning" selected={service.selectedServiceType === 'Cleaning'}>Cleaning Service</option>
                                <option value="Interior" selected={service.selectedServiceType === 'Interior'}>Interior Design</option>
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
                                <Input type="text" defaultValue={service.serState} onChange={(e) => {
                                    setService({ ...service, serState: e.target.value });
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="district" isRequired>
                                <FormLabel>District </FormLabel>
                                <Input type="text" defaultValue={service.serDist} onChange={(e) => {
                                    setService({ ...service, serDist: e.target.value });
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="municipality" isRequired>
                                <FormLabel>Municipality</FormLabel>
                                <Input type="text" defaultValue={service.serMuni} onChange={(e) => {
                                    setService({ ...service, serMuni: e.target.value });
                                }} />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl id="ward" isRequired>
                                <FormLabel>Ward Number</FormLabel>
                                <Input type="text" defaultValue={service.serWard} onChange={(e) => {
                                    setService({ ...service, serWard: e.target.value });
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="tol" isRequired>
                                <FormLabel>Area / Street name</FormLabel>
                                <Input type="text" defaultValue={service.serStreet} onChange={(e) => {
                                    setService({ ...service, serStreet: e.target.value });
                                }} />
                            </FormControl>
                        </Box>
                    </HStack>

                    {/* for uploding images  */}
                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
                        Photos
                    </Text>

                    <Box mt={5}>

                        <Input type={'file'} py={1} onChange={(e) => {
                            setImages(e.target.files[0]);
                        }}></Input>


                    </Box>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
                        Contact Information
                    </Text>
                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="name" isRequired>
                                <FormLabel>Owner name</FormLabel>
                                <Input type="text" defaultValue={service.serOname} onChange={(e) => {
                                    setService({ ...service, serOname: e.target.value });
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="number" isRequired>
                                <FormLabel>Phone Number </FormLabel>
                                <Input type="text" defaultValue={service.serPhone} onChange={(e) => {
                                    setService({ ...service, serPhone: e.target.value });
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" defaultValue={service.serEmail} onChange={(e) => {
                                    setService({ ...service, serEmail: e.target.value });
                                }} />
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
                            defaultValue={service.serProd}
                            onChange={(e) => {
                                setService({ ...service, serProd: e.target.value });
                            }}

                        />
                    </FormControl>

                    <FormControl id="Description" isRequired mt={7}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Description"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            h={25}
                            defaultValue={service.serDesc}
                            onChange={(e) => {
                                setService({ ...service, serDesc: e.target.value });
                            }}
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
                                Update
                            </Button>
                        </Stack>
                        <Stack pt={6}></Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
