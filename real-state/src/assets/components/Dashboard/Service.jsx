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
} from "@chakra-ui/react";
import { GoLocation } from 'react-icons/go'
import { useNavigate } from "react-router-dom";



export default function Service() {
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        location: 'Los Angeles, California',
        formattedPrice: '$1,900.00',
    }
    const navigate = useNavigate();
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


                    <Flex w={"full"} minH={"100vh"} bg={useColorModeValue("white", "gray.700")} direction={"column"}>

                        <SimpleGrid minChildWidth='200px' spacing='40px' m={5}>

                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                <Image src={property.imageUrl} alt={property.imageAlt} />

                                <Box p='6'>

                                    <Box
                                        mt='1'
                                        fontWeight='semibold'
                                        as='h4'
                                        lineHeight='tight'
                                        noOfLines={1}
                                    >
                                        {property.title}
                                    </Box>


                                    <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                        <GoLocation /> {property.location}
                                    </Flex>
                                </Box>


                            </Box>

                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                <Image src={property.imageUrl} alt={property.imageAlt} />

                                <Box p='6'>

                                    <Box
                                        mt='1'
                                        fontWeight='semibold'
                                        as='h4'
                                        lineHeight='tight'
                                        noOfLines={1}
                                    >
                                        {property.title}
                                    </Box>


                                    <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                        <GoLocation /> {property.location}
                                    </Flex>
                                </Box>


                            </Box>

                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                <Image src={property.imageUrl} alt={property.imageAlt} />

                                <Box p='6'>

                                    <Box
                                        mt='1'
                                        fontWeight='semibold'
                                        as='h4'
                                        lineHeight='tight'
                                        noOfLines={1}
                                    >
                                        {property.title}
                                    </Box>


                                    <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                        <GoLocation /> {property.location}
                                    </Flex>
                                </Box>


                            </Box>

                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                <Image src={property.imageUrl} alt={property.imageAlt} />

                                <Box p='6'>

                                    <Box
                                        mt='1'
                                        fontWeight='semibold'
                                        as='h4'
                                        lineHeight='tight'
                                        noOfLines={1}
                                    >
                                        {property.title}
                                    </Box>


                                    <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                        <GoLocation /> {property.location}
                                    </Flex>
                                </Box>


                            </Box>
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                <Image src={property.imageUrl} alt={property.imageAlt} />

                                <Box p='6'>

                                    <Box
                                        mt='1'
                                        fontWeight='semibold'
                                        as='h4'
                                        lineHeight='tight'
                                        noOfLines={1}
                                    >
                                        {property.title}
                                    </Box>


                                    <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                        <GoLocation /> {property.location}
                                    </Flex>
                                </Box>


                            </Box>


                        </SimpleGrid>


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

