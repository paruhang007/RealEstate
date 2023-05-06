import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Image,
    Badge,
    Button,
    SimpleGrid,
} from "@chakra-ui/react";
import { GoLocation } from 'react-icons/go'

export default function Favourite() {
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        location: 'Los Angeles, California',
        formattedPrice: '$1,900.00',
    }

    return (

        <Flex w={"full"} minH={"100vh"} bg={useColorModeValue("white", "gray.700")} direction={"column"}>
            <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"} ml={5}>
                Favourite Properties
            </Text>
            <SimpleGrid minChildWidth='200px' spacing='40px' w={"full"} m={5}>

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

                        <Box>
                            {property.formattedPrice}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box>
                        </Box>

                        <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                            <GoLocation /> {property.location}
                        </Flex>
                    </Box>

                    <Flex gap={5} justify={'center'} mb={3}>
                        <Button colorScheme='blue' size='sm'>Remove</Button>
                        <Button colorScheme='blue' size='sm'>View</Button>
                    </Flex>
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

                        <Box>
                            {property.formattedPrice}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box>
                        </Box>
                    </Box>

                    <Flex gap={5} justify={'center'} mb={3}>
                        <Button colorScheme='blue' size='sm'>Remove</Button>
                        <Button colorScheme='blue' size='sm'>View</Button>
                    </Flex>
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

                        <Box>
                            {property.formattedPrice}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box>
                        </Box>
                    </Box>

                    <Flex gap={5} justify={'center'} mb={3}>
                        <Button colorScheme='blue' size='sm'>Remove</Button>
                        <Button colorScheme='blue' size='sm'>View</Button>
                    </Flex>
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

                        <Box>
                            {property.formattedPrice}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box>
                        </Box>
                    </Box>

                    <Flex gap={5} justify={'center'} mb={3}>
                        <Button colorScheme='blue' size='sm'>Remove</Button>
                        <Button colorScheme='blue' size='sm'>View</Button>
                    </Flex>
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

                        <Box>
                            {property.formattedPrice}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box>
                        </Box>
                    </Box>

                    <Flex gap={5} justify={'center'} mb={3}>
                        <Button colorScheme='blue' size='sm'>Remove</Button>
                        <Button colorScheme='blue' size='sm'>View</Button>
                    </Flex>
                </Box>




            </SimpleGrid>
        </Flex>
    )
}