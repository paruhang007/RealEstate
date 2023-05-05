import React from "react";
import {
    chakra,
    Box,
    Flex,
    SimpleGrid,
    Button,
    Image,
    Text,
    Heading,
    useColorModeValue,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    IconButton,
    Badge,
} from "@chakra-ui/react";
import { GoLocation } from 'react-icons/go'
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { MdFavoriteBorder } from 'react-icons/md'
import { useState, useEffect } from 'react'



export default function Service() {
    const [property, setProperty] = useState([]);
    const [selectedPropertyType, setSelectedPropertyType] = useState(property);

    const [search, setSearch] = useState(false);
    const navigate = useNavigate();

    // load data into the table
    const loaddata = async () => {
        try {
            const response = await fetch('http://localhost:5000/getAllService', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const prop = await response.json();
            // gets the data from the database by filtering only property from different users 
            console.log(prop.data);
            setProperty(prop.data);
            setSelectedPropertyType(prop.data);

            // mapping the data to get only the property
            // const data = prop.data.map(
            //     (prop) => {
            //         return prop.service
            //     }
            // )
            // console.log(data);
            // setProperty(data);
            // setSelectedPropertyType(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loaddata();
    }, []);

    // search handler
    const searchHandler = (e) => {
        const search = e.target.value;
        console.log(search);
        setSearch(search);

        if (search.length === 0) {
            setSelectedPropertyType(property);
        } else {
            setSelectedPropertyType(
                property.filter((prop) => {
                    return prop.service.serName.toLowerCase().includes(search.toLowerCase()) || prop.service._id.toLowerCase().includes(search.toLowerCase()) || prop.service.serDist.toLowerCase().includes(search.toLowerCase()) || prop.service.serStreet.toLowerCase().includes(search.toLowerCase()) || prop.service.serMuni.toLowerCase().includes(search.toLowerCase()) || prop.service.serState.toLowerCase().includes(search.toLowerCase());
                })
            );
        }
    };

    // sort handler
    const handelsort = (e) => {
        const select = e.target.value;
        console.log(select);

        // sorting the services according to the service type selected 
        setSelectedPropertyType(
            select !== "all"
                ? property.filter((prop) => {
                    // checking if the service type is equal to the selected service type
                    return prop.service.selectedServiceType === select;
                })
                : property
        );
    };

    return (
        <Box>
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={0}
                _after={{
                    bg: "brand.500",
                    opacity: 0.25,
                    pos: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: -1,
                    content: '" "',
                }}
            >
                <Flex
                    direction="column"
                    alignItems="start"
                    justifyContent="center"
                    px={{ base: 4, lg: 20 }}
                    py={24}
                >

                    <chakra.h1
                        mb={6}
                        fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                        fontWeight="bold"
                        color="brand.600"
                        _dark={{ color: "gray.300" }}
                        lineHeight="shorter"
                    >

                        Connect with many service providers with GharJagga
                    </chakra.h1>

                    <chakra.p
                        pr={{ base: 0, lg: 16 }}
                        mb={4}
                        fontSize="sm"
                        color="brand.600"
                        _dark={{ color: "gray.400" }}
                        letterSpacing="wider"
                    >
                        Find and get the best deal.
                    </chakra.p>
                </Flex>
                <Box>
                    <Image
                        src="images/ser.png"
                        alt="emi image"
                        fit="cover"
                        w="full"
                        h={{ base: 64, md: "full" }}
                        bg="gray.100"
                        loading="lazy"
                    />
                </Box>
            </SimpleGrid>

            {/* Area for Services */}
            <Flex width={'100%'} direction={'column'} align={'center'} bg="gray.100" >
                <Heading fontSize='28px' mt={8} pl={3} >Easily Advertise your business with a few steps and expand your business.</Heading>


                <Box as={'Flex'} borderRadius={5} border={3} borderColor={'blue.100'} bg={'white'} width={'80%'} m={5}>


                    {/* pulled from search prop  */}

                    <Flex m={5} minH={'300'} direction={'column'} borderWidth='1px' borderColor={'black.200'} bg={'#ffffff'}>

                        {/* search bar and quick sort  */}
                        <Flex m={5} gap={5} align={'center'} >

                            <InputGroup >
                                <InputLeftElement pointerEvents="none" color={'black'}>
                                    <AiOutlineSearch />
                                </InputLeftElement>
                                <Input type="tel" onChange={(e) => searchHandler(e)} placeholder="Search using ID or Property Name..." color={'black'} w={'60%'} />
                            </InputGroup>



                            <Flex w={'50%'} align={'center'}>
                                <Text fontSize={"sm"} color={"gray.600"} w={'30%'}>
                                    Sort By:
                                </Text>
                                <Select w={'70%'} fontSize={14} onChange={(e) => {
                                    handelsort(e)
                                }}>
                                    <option value="all">All</option>
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
                            </Flex>

                        </Flex>

                        {/* another div for viewing products */}


                        <Flex mt={5}  >
                            <SimpleGrid minChildWidth='150px' spacing='40px' w={"full"} m={5}>

                                {selectedPropertyType.map((prop) => {
                                    return (
                                        < Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                            <Image
                                                src={prop.service.img}
                                                alt={"service image"}
                                                objectFit={'cover'}
                                                onClick={() => {

                                                    navigate(`/detailservice/${prop._id}/${prop.service._id}`);

                                                }}
                                            />

                                            <Box p='6'>
                                                <Flex align={'center'}>

                                                    <Box
                                                        mt='1'
                                                        fontWeight='semibold'
                                                        as='h4'
                                                        lineHeight='tight'
                                                        noOfLines={1}
                                                    >
                                                        {prop.service.serName}
                                                    </Box>


                                                </Flex>



                                                <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                                    <GoLocation /> {prop.service.serState}, {prop.service.serDist}, {prop.service.serStreet}
                                                </Flex>

                                                <Box display='flex' alignItems='baseline' m={3} gap={2}>
                                                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                        {prop.service.selectedServiceType}
                                                    </Badge>



                                                </Box>
                                            </Box>

                                        </Box>


                                    )
                                })}





                            </SimpleGrid>



                        </Flex>

                    </Flex>


                    <Box as="flex" >
                        <Card align='center' borderWidth={1} >

                            <CardBody>
                                <Text>List and Advertise your Services.</Text>
                            </CardBody>
                            <CardFooter>
                                <Button colorScheme='blue' onClick={() => navigate("/addservice")} > Add your Service </Button>
                            </CardFooter>
                        </Card>
                    </Box>

                </Box>
            </Flex >
        </Box >
    );
};

