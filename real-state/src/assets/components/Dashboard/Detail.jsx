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
    useColorModeValue,
    List,
    ListItem,
    Container,
    StackDivider,
    Center,
    Avatar,
    Link,

} from "@chakra-ui/react";
import { MdLocalShipping } from 'react-icons/md';
import { GoLocation } from 'react-icons/go'


export default function SearchProp() {
    return (
        <Grid templateColumns='repeat(7, 1fr)' gap={2} py={5} px={10} bg="gray.100">
            <GridItem colStart={1} colEnd={6} >
                <Flex m={5} minH={'100'} borderWidth='1px' borderColor={'black.200'} bg={'#ffffff'} direction={'column'} p={10} >
                    <Stack spacing={{ base: 6, md: 10 }}>

                        <Box as={'header'}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={400}
                                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                Morden Style Home
                            </Heading>
                            <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                <GoLocation /> 1234 Main Street, Los Angeles, CA 90025
                            </Flex>
                            <Text
                                color={useColorModeValue('gray.900', 'gray.400')}
                                fontWeight={300}
                                fontSize={'2xl'}>
                                $350.00 USD
                            </Text>

                            <Box display='flex' alignItems='baseline' mt={3} gap={3}>
                                <Badge borderRadius='full' px='2' colorScheme='teal'>
                                    SALE
                                </Badge>

                                <Badge borderRadius='full' px='2' colorScheme='teal'>
                                    ID134
                                </Badge>

                                <Badge borderRadius='full' px='2' colorScheme='teal'>
                                    HOUSE
                                </Badge>

                                <Badge borderRadius='full' px='2' colorScheme='teal'>
                                    VERIFIED
                                </Badge>

                                <Box
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    textTransform='uppercase'
                                    ml='2'
                                >
                                    3 beds &bull; 2 baths
                                </Box>
                            </Box>
                        </Box>

                        <Flex>
                            <Image
                                rounded={'md'}
                                alt={'product image'}
                                src={
                                    'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
                                }
                                fit={'cover'}
                                align={'center'}
                                w={'100%'}
                                h={{ base: '100%', sm: '400px', lg: '500px' }}
                            />
                        </Flex>



                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                                />
                            }>

                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Property Highlights
                                </Text>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                    <List spacing={2}>
                                        <ListItem>Area</ListItem>
                                        <ListItem>Road Size</ListItem>

                                    </List>
                                    <List spacing={2}>
                                        <ListItem>Facing</ListItem>
                                        <ListItem>Posted On</ListItem>

                                    </List>
                                </SimpleGrid>
                            </Box>

                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Ammenities
                                </Text>

                                <List spacing={2}>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Drainage:
                                        </Text>{' '}
                                        20 mm
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Drinking Water:
                                        </Text>{' '}
                                        claen
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Parking:
                                        </Text>{' '}
                                        yes
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Earthquake Resistant:
                                        </Text>{' '}
                                        yes
                                    </ListItem>


                                </List>
                            </Box>

                            <VStack spacing={{ base: 4, sm: 6 }}>
                                <Text
                                    color={useColorModeValue('gray.500', 'gray.400')}
                                    fontSize={'2xl'}
                                    fontWeight={'300'}>
                                    Description of the property
                                </Text>
                                <Text fontSize={'lg'}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                                    aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                                    maxime modi nam officiis porro, quae, quisquam quos
                                    reprehenderit velit? Natus, totam.
                                </Text>
                            </VStack>

                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={useColorModeValue('yellow.500', 'yellow.300')}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    View On Map
                                </Text>
                                <Button>
                                    Click me
                                </Button>

                            </Box>

                        </Stack>




                    </Stack>
                </Flex>
            </GridItem>


            {/* second portion of the page  */}

            <GridItem colStart={6} colEnd={8} minH={'500'} justify={'center'}  >
                <Flex m={5} minH={'300'} direction={'column'} borderWidth='1px' borderColor={'black.200'} bg={'#ffffff'} p={5}>
                    {/* Portion for the owner of the post  */}
                    <Center py={6}>
                        <Box
                            maxW={'320px'}
                            w={'full'}
                            bg={useColorModeValue('white', 'gray.900')}
                            boxShadow={'2xl'}
                            rounded={'lg'}
                            p={6}
                            textAlign={'center'}>
                            <Avatar
                                size={'xl'}
                                src={
                                    'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                                }
                                alt={'Avatar Alt'}
                                mb={4}
                                pos={'relative'}
                            />
                            <Heading fontSize={'2xl'} fontFamily={'body'}>
                                Lindsey James
                            </Heading>
                            <Text fontWeight={600} color={'gray.500'} mb={4}>
                                example@gmail.com
                            </Text>

                            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                                <Badge
                                    px={2}
                                    py={1}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'}>
                                    5 Listings
                                </Badge>

                            </Stack>

                            <Stack mt={8} direction={'row'} spacing={4}>
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    _focus={{
                                        bg: 'gray.200',
                                    }}>
                                    Message
                                </Button>

                            </Stack>
                        </Box>
                    </Center>

                    {/* portion for Related Properties */}
                    <Box
                        maxW={'320px'}
                        w={'full'}
                        bg={useColorModeValue('white', 'gray.900')}
                        boxShadow={'2xl'}
                        rounded={'lg'}
                        p={6}
                    >
                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                            Similar Properties
                        </Heading>

                        {/* similar properties */}

                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' borderColor={'blue.200'} mt={3}>
                            <Image src="images/emi.png" alt='house img' />

                            <Box p='6' >

                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={1}
                                >
                                    Modern House
                                </Box>

                                <Box>
                                    45000
                                    <Box as='span' color='gray.600' fontSize='sm'>
                                        / wk
                                    </Box>
                                </Box>

                                <Flex as='span' color='gray.600' fontSize='sm' direction={'row'} mt={2} align="center">
                                    <GoLocation /> 1234 Main St
                                </Flex>
                            </Box>


                        </Box>



                    </Box>

                </Flex>
            </GridItem>

        </Grid >

    )
}