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

export default function SearchProp() {
    return (
        <Grid templateColumns='repeat(7, 1fr)' gap={3} py={5} px={10} bg="gray.100">
            <GridItem colStart={1} colEnd={6} bg="red.100">
                <Flex m={10} minH={'100'} borderWidth='1px' borderColor={'black.200'} bg={'#ffffff'} >

                </Flex>
            </GridItem>

            <GridItem colStart={6} colEnd={8} minH={'500'} justify={'center'} bg="red.100" >
                <Flex m={10} minH={'300'} direction={'column'} borderWidth='1px' borderColor={'black.200'} bg={'#ffffff'}>

                </Flex>
            </GridItem>

        </Grid >

    )
}