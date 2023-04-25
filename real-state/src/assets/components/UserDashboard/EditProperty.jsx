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
    SimpleGrid,
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

    const [propName, setPropName] = useState("");
    const [propState, setPropState] = useState("");
    const [propDist, setPropDist] = useState("");
    const [propMuni, setPropMuni] = useState("");
    const [propWard, setPropWard] = useState("");
    const [propStreet, setPropStreet] = useState("");
    const [propFace, setPropFace] = useState("");
    const [propRoad, setPropRoad] = useState("");
    const [propArea, setPropArea] = useState("");
    const [propDesc, setPropDesc] = useState("");
    const [propPrice, setPropPrice] = useState("");


    const [selectedFor, setSelectedFor] = useState('');
    const [selectedPropertyType, setSelectedPropertyType] = useState('');
    const [selectedPropertyUnit, setSelectedPropertyUnit] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');

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


    // for viewng the data from the database 
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [selectedData, setSelectedData] = useState({});

    const { id, packId } = useParams();

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5000/getPack", {
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
        console.log(product);
        const object = {
            id,
            packId,
            imageLink,
            ...product,
        }
        console.log(object);
        if (imageLink) {
            try {
                const response = fetch("http://localhost:5000/editPack", {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(
                        object
                    ),
                })
                console.log(response);
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
                                <Input type="text" defaultValue={product.propName} onChange={(e) => {
                                    setProduct({ ...product, propName: e.target.value })
                                }} />
                            </FormControl>
                        </Box>
                    </HStack>

                    <HStack gap={5} align={"center"} mt={5} >
                        <Box>
                            <Select placeholder="For" isrequired value={selectedFor} onChange={(e) => {
                                setProduct({ ...product, selectedFor: e.target.value })
                            }}>
                                <option value="Rent" selected={product.selectedFor === 'Rent'}>Rent </option>
                                <option value="Sale" selected={product.selectedFor === 'Sale'}>Sale </option>
                                <option value="Lease" selected={product.selectedFor === 'Lease'}>Lease </option>
                            </Select>
                        </Box>
                        <Box>
                            <Select placeholder="Property Type" isrequired value={selectedPropertyType} onChange={(e) => {
                                setProduct({ ...product, selectedPropertyType: e.target.value })
                            }}>
                                <option value="Land" selected={product.selectedPropertyType === 'Land'}>Land </option>
                                <option value="Flat" selected={product.selectedPropertyType === 'Flat'}>Flat </option>
                                <option value="House" selected={product.selectedPropertyType === 'House'}>House </option>
                                <option value="Apartment" selected={product.selectedPropertyType === 'Apartment'}>Apartment </option>
                                <option value="Office space" selected={product.selectedPropertyType === 'Office space'}>Office space </option>
                                <option value="Shop space" selected={product.selectedPropertyType === 'Shop space'}>Shop space </option>
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
                                <Input type="text" value={product.propState} onChange={(e) => {
                                    setProduct({ ...product, propState: e.target.value });
                                }} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="district" isRequired>
                                <FormLabel>District </FormLabel>
                                <Input type="text" defaultValue={product.propDist} onChange={(e) => setProduct(
                                    { ...product, propDist: e.target.value }
                                )} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="municipality" isRequired>
                                <FormLabel>Municipality</FormLabel>
                                <Input type="text" defaultValue={product.propMuni} onChange={(e) => setProduct(
                                    { ...product, propMuni: e.target.value }
                                )} />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl id="ward" isRequired>
                                <FormLabel>Ward Number</FormLabel>
                                <Input type="text" defaultValue={product.propWard} onChange={(e) => setProduct(
                                    { ...product, propWard: e.target.value }
                                )} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="tol" isRequired>
                                <FormLabel>Area / Street name</FormLabel>
                                <Input type="text" defaultValue={product.propStreet} onChange={(e) => setProduct(
                                    { ...product, propStreet: e.target.value }
                                )} />
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
                        Property Higlights
                    </Text>
                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="face" isRequired>
                                <FormLabel>Facing</FormLabel>
                                <Input type="text" defaultValue={product.propFace} onChange={(e) => setProduct(
                                    { ...product, propFace: e.target.value }
                                )} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="road" isRequired>
                                <FormLabel>Road Size </FormLabel>
                                <Input type="text" defaultValue={product.propRoad} onChange={(e) => setProduct(
                                    { ...product, propRoad: e.target.value }
                                )} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="area" isRequired>
                                <FormLabel>Area</FormLabel>
                                <Input type="text" placeholder="Mention Unit" defaultValue={product.propArea} onChange={(e) => setProduct(
                                    { ...product, propArea: e.target.value }
                                )} />
                            </FormControl>
                        </Box>
                        <Box>
                            <Select placeholder="Unit Type" isrequired mt={7} value={selectedPropertyUnit} onChange={(e) => {
                                setProduct({ ...product, selectedPropertyUnit: e.target.value })
                            }}>
                                <option value="Hilly Area" selected={product.selectedPropertyUnit === 'Hilly Area'}>Hilly Area </option>
                                <option value="Terai Area" selected={product.selectedPropertyUnit === 'Terai Area'}>Terai Area </option>
                                <option value="Standard sq meter/ft " selected={product.selectedPropertyUnit === 'Standard sq meter/ft '}>Standard sq meter/ft </option>
                            </Select>
                        </Box>
                    </HStack>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
                        Amenities and Featurees
                    </Text>


                    <SimpleGrid mt={5} columns={{ sm: 3, md: 4 }}>
                        <Checkbox value="Drainage" defaultChecked={
                            selectedData["Drainage"]
                        }
                            isChecked={checkboxValues.Drainage}
                            onChange={handleCheckboxChange}

                        >Drainage</Checkbox>

                        <Checkbox value="Drinking" defaultChecked={
                            selectedData["Drinking"]
                        }
                            isChecked={checkboxValues.Drinking}

                        >Drinking Water</Checkbox>

                        <Checkbox value="parking" defaultChecked={
                            selectedData["parking"]
                        }
                            isChecked={checkboxValues.parking}
                            onChange={handleCheckboxChange}
                        >Parking</Checkbox>

                        <Checkbox value="Dining " defaultChecked={
                            selectedData["Dining"]
                        }
                            isChecked={checkboxValues.Dining}
                            onChange={handleCheckboxChange}
                        >Dining Room</Checkbox>

                        <Checkbox value="Kitchen" defaultChecked={
                            selectedData["Kitchen"]
                        }
                            isChecked={checkboxValues.Kitchen}
                            onChange={handleCheckboxChange}
                        >Kitchen</Checkbox>

                        <Checkbox value="Bedroom" defaultChecked={
                            selectedData["Bedroom"]
                        }
                            isChecked={checkboxValues.Bedrom}
                            onChange={handleCheckboxChange}
                        >Bedroom</Checkbox>

                        <Checkbox value="Earth" defaultChecked={
                            selectedData["Earth"]
                        }
                            isChecked={checkboxValues.Earth}
                            onChange={handleCheckboxChange}
                        >Earthquake Resistance</Checkbox>

                    </SimpleGrid >


                    <FormControl id="oldpassword" isRequired mt={7}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Description"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            h={25}
                            defaultValue={product.propDesc}
                            onChange={(e) => setProduct(
                                { ...product, propDesc: e.target.value }
                            )}
                        />
                    </FormControl>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
                        Payment Details
                    </Text>

                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="price" isRequired>
                                <FormLabel>Enter Price </FormLabel>
                                <Input type="text" defaultValue={product.propPrice} onChange={(e) => setProduct(
                                    { ...product, propPrice: e.target.value }
                                )} />
                            </FormControl>
                        </Box>
                        <Box>
                            <Select placeholder="Unit Type" isrequired mt={7} value={selectedPayment} onChange={(e) => {
                                setProduct({ ...product, selectedPayment: e.target.value })
                            }}>
                                <option value="Per Month" selected={product.selectedPropertyUnit === 'Per Month'}>Per Month </option>
                                <option value="Per Year" selected={product.selectedPropertyUnit === 'Per Year'}>Per Year </option>
                                <option value="For Sale" selected={product.selectedPropertyUnit === 'For Sale'}>For Sale </option>
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
                                type="submit"
                            >
                                Update
                            </Button>
                        </Stack>
                        <Stack pt={6}></Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex >
    );
}
