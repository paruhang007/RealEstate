import {
    Flex,
    Box,
    Heading,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    HStack,
    Select,
    Grid,
    GridItem,
    Button,
    FormControl,
    FormLabel,
    SimpleGrid,
    Image,
    Badge,
    IconButton,
    RadioGroup,
    VStack,
    Radio,
    Stack,
    Divider,
    Icon,
    chakra,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from 'react-icons/go'
import { MdFavoriteBorder } from 'react-icons/md'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function SearchProp() {

    // for property card
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        // src: "images/calculate.png",
        imageAlt: 'Rear view of modern home with pool',
        title: 'Modern home in city center in the heart of historic Los Angeles',
        location: 'Los Angeles, California',
        formattedPrice: '$1,900.00',
        beds: 3,
        baths: 2,
        for: 'SALE',
    }

    // for pagination buttons
    const PagButton = (props) => {
        const activeStyle = {
            bg: "brand.600",
            _dark: { bg: "brand.500" },
            color: "white"
        };

        return (
            <chakra.button
                mx={1}
                px={4}
                py={2}
                rounded="md"
                bg="white"
                _dark={{ bg: "gray.800" }}
                color="gray.700"
                opacity={props.disabled && 0.6}
                _hover={!props.disabled && activeStyle}
                cursor={props.disabled && "not-allowed"}
                {...(props.active && activeStyle)}
                display={props.p && !props.active && { base: "none", sm: "block" }}
            >
                {props.children}
            </chakra.button>
        );
    };

    return (
        <Grid templateColumns='repeat(6, 1fr)' gap={3} py={5} px={10} bg="gray.100">
            <GridItem colStart={1} colEnd={3}  >
                <Flex m={10} minH={'100'} borderWidth='1px' borderColor={'black.200'} bg={'#ffffff'} >

                    <FormControl m={3}  >
                        <FormLabel >
                            Property status
                        </FormLabel>

                        <RadioGroup >
                            <VStack display={"flex"} spacing='24px' alignItems={"start"}>
                                <Radio value='Sale'>For Sale</Radio>
                                <Radio value='Rent'>For Rent</Radio>
                                <Radio value='Lease'>For Lease</Radio>
                            </VStack>
                        </RadioGroup>

                        <Divider mt={5} />

                        <FormLabel mt={5}>
                            Property Type
                        </FormLabel>
                        <RadioGroup >
                            <VStack spacing='24px' display={"flex"} alignItems={"start"}>
                                <Radio value='Land'>Land</Radio>
                                <Radio value='Flat'>Flat</Radio>
                                <Radio value='House'>House</Radio>
                                <Radio value='Apartment'>Apartment</Radio>
                                <Radio value='Office'>Office Space</Radio>
                                <Radio value='Shop'>Shop Space</Radio>
                            </VStack>
                        </RadioGroup>
                    </FormControl>


                </Flex>
            </GridItem>


            <GridItem colStart={3} colEnd={7} minH={'500'} justify={'center'} >

                <Flex m={5} minH={'300'} direction={'column'} borderWidth='1px' borderColor={'black.200'} bg={'#ffffff'}>

                    {/* search bar and quick sort  */}
                    <Flex m={5} gap={5} align={'center'} >

                        <InputGroup >
                            <InputLeftElement pointerEvents="none" color={'black'}>
                                <AiOutlineSearch />
                            </InputLeftElement>
                            <Input type="tel" placeholder="Search..." color={'black'} w={'60%'} />
                        </InputGroup>



                        <Flex w={'50%'} align={'center'}>
                            <Text fontSize={"sm"} color={"gray.600"} w={'30%'}>
                                Sort By:
                            </Text>
                            <Select placeholder="Catogery" isrequired defaultValue={'latest'} w={'70%'} fontSize={14} >
                                <option value="latest">Latest First </option>
                                <option value="high">Price high to low </option>
                                <option value="low">Price low to high </option>
                            </Select>
                        </Flex>

                    </Flex>

                    {/* another div for viewing products */}


                    <Flex mt={5}  >
                        <SimpleGrid minChildWidth='200px' spacing='40px' w={"full"} m={5}>

                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                <Image src={property.imageUrl} alt={property.imageAlt} />

                                <Box p='6'>
                                    <Flex align={'center'}>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={1}
                                        >
                                            {property.title}
                                        </Box>

                                        <IconButton
                                            variant='outline'
                                            colorScheme='teal'
                                            aria-label='favourite'
                                            icon={<MdFavoriteBorder />}
                                        />
                                    </Flex>

                                    <Box>
                                        {property.formattedPrice}
                                        <Box as='span' color='gray.600' fontSize='sm'>
                                            / wk
                                        </Box>
                                    </Box>

                                    <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                        <GoLocation /> {property.location}
                                    </Flex>

                                    <Box display='flex' alignItems='baseline' m={3}>
                                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                                            {property.for}
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        >
                                            {property.beds} beds &bull; {property.baths} baths
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>

                            {/* another box example  */}
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} >
                                <Image src={property.imageUrl} alt={property.imageAlt} />

                                <Box p='6'>
                                    <Flex align={'center'}>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={1}
                                        >
                                            {property.title}
                                        </Box>

                                        <IconButton
                                            variant='outline'
                                            colorScheme='teal'
                                            aria-label='favourite'
                                            icon={<MdFavoriteBorder />}
                                        />
                                    </Flex>

                                    <Box>
                                        {property.formattedPrice}
                                        <Box as='span' color='gray.600' fontSize='sm'>
                                            / wk
                                        </Box>
                                    </Box>

                                    <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                        <GoLocation /> {property.location}
                                    </Flex>

                                    <Box display='flex' alignItems='baseline' m={3}>
                                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                                            {property.for}
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        >
                                            {property.beds} beds &bull; {property.baths} baths
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>



                        </SimpleGrid>

                        {/* navigate pages */}
                        {/* <Flex>
                            <PagButton>
                                <Icon
                                    as={IoIosArrowBack}
                                    color="gray.700"
                                    _dark={{ color: "gray.200" }}
                                    boxSize={4}
                                />
                            </PagButton>
                            <PagButton p>1</PagButton>
                            <PagButton p active>
                                2
                            </PagButton>
                            <PagButton p>3</PagButton>
                            <PagButton p>4</PagButton>
                            <PagButton p>5</PagButton>
                            <PagButton>
                                <Icon
                                    as={IoIosArrowForward}
                                    color="gray.700"
                                    _dark={{ color: "gray.200" }}
                                    boxSize={4}
                                />
                            </PagButton>
                        </Flex> */}

                    </Flex>

                </Flex>



            </GridItem >

        </Grid >
    )
}

