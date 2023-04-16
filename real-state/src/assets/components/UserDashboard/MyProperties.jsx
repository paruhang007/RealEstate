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
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tfoot,
    useColorModeValue,
    IconButton,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,


} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';


export default function MyProperties() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();



    const [property, setProperty] = useState([]);

    const [selectedFor, setSelectedFor] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedPropertyType, setSelectedPropertyType] = useState(property);

    // Category filter
    const handlerCate = (e) => {
        const select = e.target.value;
        console.log(select);

        if (select === "all") {
            setSelectedPropertyType(
                selectedFor !== "all"
                    ? property.filter((prop) => {
                        return prop.selectedFor === selectedFor;
                    })
                    : property
            );
        } else {
            setSelectedPropertyType(
                selectedFor !== "all"
                    ? property.filter((prop) => {
                        return prop.selectedFor === selectedFor && prop.selectedPropertyType === select;
                    })
                    : property.filter((prop) => {
                        return prop.selectedPropertyType === select;
                    })
            );
        }

        setSelectedType(select);
    };

    // for filter
    const handleLeige = (e) => {
        const select = e.target.value;
        setSelectedFor(select);
        console.log(select);
        console.log(selectedType);

        if (select === "all") {
            setSelectedPropertyType(
                selectedType !== "all"
                    ? property.filter((prop) => {
                        return prop.selectedPropertyType === selectedType;
                    })
                    : property
            );
        } else {
            setSelectedPropertyType(
                selectedType !== "all"
                    ? property.filter((prop) => {
                        return prop.selectedFor === select && prop.selectedPropertyType === selectedType;
                    })
                    : property.filter((prop) => {
                        return prop.selectedFor === select;
                    })
            );
        }
    };


    // const handlerCate = (e) => {
    //     const select = e.target.value;
    //     console.log(select);
    //     const filtered = property.filter((prop) => {
    //         return prop.selectedPropertyType === select;
    //     });
    //     setProperty(filtered);
    // }


    // getting the token from local storage
    const data = localStorage.getItem('token');
    // decoding the token which is actually holding the user id  
    const user = jwt_decode(data);

    const loaddata = async () => {
        try {
            const response = await fetch('http://localhost:5000/getPackAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": user.id,
                }),
            });
            const prop = await response.json();
            setProperty(prop.data);
            console.log(prop.data);
            setSelectedPropertyType(prop.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loaddata();
    }, []);


    // set the property id to the state
    const [propID, setPropID] = useState("");

    const handelDel = async () => {
        try {
            const response = await fetch('http://localhost:5000/deletePack', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": user.id,
                    "packId": propID,
                }),
            });
            const prop = await response.json();
            console.log(prop);
            loaddata();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Flex w={"full"} bg={useColorModeValue("white", "gray.700")}>

            <Box m={2} w={'full'} >
                <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"} ml={5}>
                    My property
                </Text>
                <Flex w={'100%'} m={5} gap={5}>

                    <InputGroup >
                        <InputLeftElement pointerEvents="none" color={'black'}>
                            <AiOutlineSearch />
                        </InputLeftElement>
                        <Input type="tel" placeholder="Search..." color={'black'} w={'50%'} />
                    </InputGroup>


                    {/* for  */}
                    <Box w={'20%'}>
                        <Select onChange={(e) => {
                            handleLeige(e)
                        }}>
                            <option value="all">All </option>
                            <option value="Rent">Rent </option>
                            <option value="Sale">Sale </option>
                            <option value="Lease">Lease </option>
                        </Select>
                    </Box>

                    {/* category */}
                    <Box w={'25%'} >
                        <Select isrequired onChange={(e) => {
                            handlerCate(e);
                        }}>
                            <option value="all">All </option>
                            <option value="Land">Land </option>
                            <option value="Flat">Flat </option>
                            <option value="House">House </option>
                            <option value="Apartment">Apartment </option>
                            <option value="Office space">Office space </option>
                            <option value="Shop space">Shop space </option>
                        </Select>
                    </Box>
                </Flex>

                <TableContainer m={5}>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Property</Th>
                                <Th>Property Type</Th>
                                <Th>Property Catogery</Th>
                                <Th>Area</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedPropertyType.map((prop) => {
                                return (
                                    <Tr>
                                        <Td>{prop._id}</Td>
                                        <Td>{prop.propName}</Td>
                                        <Td >{prop.selectedPropertyType}</Td>
                                        <Td >{prop.selectedFor}</Td>
                                        <Td>{prop.propArea}</Td>
                                        <Td>{prop.verified ? "1" : "0"}</Td>
                                        <Td >
                                            <Flex gap={4}>
                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Call Sage'
                                                    fontSize='20px'
                                                    icon={<AiOutlineEdit />}
                                                    onClick={onEditOpen} />

                                                <Modal blockScrollOnMount={false} isOpen={isEditOpen} onClose={onEditClose}>
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Edit Property </ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            <Text fontWeight='bold' mb='1rem'>
                                                                Do you want to Edit the Property?
                                                            </Text>

                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button colorScheme='blue' mr={3} >
                                                                Edit
                                                            </Button>

                                                            <Button variant='ghost' onClick={onEditClose} >Close</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>



                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Call Sage'
                                                    fontSize='20px'
                                                    icon={<AiOutlineDelete />}
                                                    onClick={onOpen}
                                                />
                                                <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Delete Property </ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            <Text fontWeight='bold' mb='1rem'>
                                                                Do you want to Delete the Property?
                                                            </Text>

                                                        </ModalBody>

                                                        <ModalFooter>
                                                            {/* <Button colorScheme='blue' mr={3} onClick={handelDel(setPropID(prop._id))}> */}
                                                            <Button colorScheme='blue' mr={3} onClick={handelDel}>

                                                                Delete
                                                            </Button>

                                                            <Button variant='ghost' onClick={onClose} >Close</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </Flex>
                                        </Td>
                                    </Tr>)
                            })}

                        </Tbody>

                    </Table>
                </TableContainer>
            </Box>

        </Flex>
    )
}

