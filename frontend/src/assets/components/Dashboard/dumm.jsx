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
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



export default function EditProperty() {

    // const { isloaded } = useLoadScript({
    //   googleMapApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    // });

    // if (!isloaded) return <div>"Loading Maps"</div>;
    // return <Map />;

    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [selectedData, setSelectedData] = useState({});

    const { id, packId } = useParams();

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:4000/getPack", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id,
                    "packId": packId
                }),
            });
            const data = await response.json();
            console.log(data.data[0]);
            console.log(data.data[0].checkboxValues);
            setProduct(data.data[0]);
            setSelectedData(data.data[0].checkboxValues[0]);

        }

        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        console.log(selectedData);
        console.log(typeof selectedData.Drainage);

    }, [product, selectedData]);

    return (
        <Flex
            minH={"100vh"}
            bg={useColorModeValue("gray.50", "gray.800")}
            w={"full"}
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
                        onClick={() => navigate("/myproperties")}
                    >
                        Back
                    </Button>

                    <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"}>
                        Edit property
                    </Text>


                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="firstName" isRequired>
                                <FormLabel>Property Name / Title</FormLabel>
                                <Input type="text" defaultValue={product.propName} />
                            </FormControl>
                        </Box>
                    </HStack>

                    <HStack gap={5} align={"center"} mt={5} >
                        <Box>
                            <Select placeholder="For" isrequired >
                                <option value="Rent" selected={product.selectedFor === 'Rent'}>Rent </option>
                                <option value="Sale" selected={product.selectedFor === 'Sale'}>Sale </option>
                                <option value="Lease" selected={product.selectedFor === 'Lease'}>Lease </option>
                            </Select>
                        </Box>
                        <Box>
                            <Select placeholder="Property Type" isrequired defaultValue={product.selectedPropertyType}>
                                <option value="Land">Land </option>
                                <option value="Flat">Flat </option>
                                <option value="House">House </option>
                                <option value="Apartment">Apartment </option>
                                <option value="Office space">Office space </option>
                                <option value="Shop space">Shop space </option>
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
                                <Input type="text" defaultValue={product.propState} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="district" isRequired>
                                <FormLabel>District </FormLabel>
                                <Input type="text" defaultValue={product.propDist} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="municipality" isRequired>
                                <FormLabel>Municipality</FormLabel>
                                <Input type="text" defaultValue={product.propMuni} />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl id="ward" isRequired>
                                <FormLabel>Ward Number</FormLabel>
                                <Input type="text" defaultValue={product.propWard} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="tol" isRequired>
                                <FormLabel>Area / Street name</FormLabel>
                                <Input type="text" defaultValue={product.propStreet} />
                            </FormControl>
                        </Box>
                    </HStack>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
                        Property Higlights
                    </Text>
                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="face" isRequired>
                                <FormLabel>Facing</FormLabel>
                                <Input type="text" defaultValue={product.propFace} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="road" isRequired>
                                <FormLabel>Road Size </FormLabel>
                                <Input type="text" defaultValue={product.propRoad} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="area" isRequired>
                                <FormLabel>Area</FormLabel>
                                <Input type="text" placeholder="Mention Unit" defaultValue={product.propArea} />
                            </FormControl>
                        </Box>
                        <Box>
                            <Select placeholder="Unit Type" isrequired mt={7} defaultValue={product.selectedPropertyUnit}>
                                <option value="Rent">Hilly Area </option>
                                <option value="Sale">Terai Area </option>
                                <option value="Lease">Standard sq meter/ft </option>
                            </Select>
                        </Box>
                    </HStack>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
                        Amenities and Featurees
                    </Text>

                    <Box mt={5}>
                        <Checkbox value="Drainage" isChecked={
                            selectedData["Drainage"]
                        }>Drainage</Checkbox>
                        <Checkbox value="Drinking" isChecked={
                            selectedData["Drinking"]
                        }>Drinking Water</Checkbox>
                        <Checkbox value="parking" isChecked={
                            selectedData["parking"]
                        }
                        >Parking</Checkbox>
                        <Checkbox value="Dining " isChecked={
                            selectedData["Dining"]
                        }
                        >Dining Room</Checkbox>
                        <Checkbox value="Kitchen" isChecked={
                            selectedData["Kitchen"]
                        }>Kitchen</Checkbox>
                        <Checkbox value="Bedrom" isChecked={
                            selectedData["Bedrom"]
                        }>Bedroom</Checkbox>
                        <Checkbox value="Earth" isChecked={
                            selectedData["Earth"]
                        }>Earthquake Resistance</Checkbox>

                    </Box>

                    <FormControl id="oldpassword" isRequired mt={7}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Description"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            h={25}
                            defaultValue={product.propDesc}
                        />
                    </FormControl>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
                        Payment Details
                    </Text>

                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="price" isRequired>
                                <FormLabel>Enter Price </FormLabel>
                                <Input type="text" defaultValue={product.propPrice} />
                            </FormControl>
                        </Box>
                        <Box>
                            <Select placeholder="Unit Type" isrequired mt={7} defaultValue={product.selectedPayment}>
                                <option value="Rent">Per Month </option>
                                <option value="Sale">Per Year </option>
                                <option value="Lease">For Sale </option>
                            </Select>
                        </Box>
                    </HStack>

                    <Stack spacing={4} mt={4}>
                        #
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
