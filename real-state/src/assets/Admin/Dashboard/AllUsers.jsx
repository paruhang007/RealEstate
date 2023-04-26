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
import { AiOutlineDelete } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export default function AllUsers() {

    // // getting the token from local storage
    // const data = localStorage.getItem('tokenAdmin');
    // // decoding the token which is actually holding the user id  
    // const user = jwt_decode(data);
    // if (!user) {
    //     console.log("admin not logged in");
    //     navigate('/loginadmin')
    // }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate();

    const [allUsers, setAllUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(allUsers);

    const [search, setSearch] = useState(false);


    // search handler
    const searchHandler = (e) => {
        const search = e.target.value;
        console.log(search);
        setSearch(search);

        if (search.length === 0) {
            setSelectedUser(allUsers);
        } else {
            setSelectedUser(
                allUsers.filter((userall) => {
                    return userall.fname.toLowerCase().includes(search.toLowerCase());

                })
            );
        }
    };

    // || userall.email.toLowerCase().includes(search.toLowerCase()) ||
    //  userall.phone.toLowerCase().includes(search.toLowerCase());

    // load data into the table
    const loaddata = async () => {
        try {
            const response = await fetch('http://localhost:5000/getAllUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const userall = await response.json();
            setAllUser(userall.data);
            console.log(userall.data);
            setSelectedUser(userall.data);

        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loaddata();
    }, []);

    // set the property id to the state
    const [userID, setUserID] = useState("");

    const handelDel = async () => {
        try {
            const response = await fetch('http://localhost:5000/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": userID,

                }),
            });
            const serv = await response.json();
            console.log(serv);
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
                    Users
                </Text>
                <Flex m={5} gap={5}>

                    <InputGroup >
                        <InputLeftElement pointerEvents="none" color={'black'}>
                            <AiOutlineSearch />
                        </InputLeftElement>
                        <Input type="tel" onChange={(e) => searchHandler(e)} placeholder="Search using name..." color={'black'} w={'50%'} />
                    </InputGroup>



                </Flex>

                <TableContainer m={5}>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>User ID</Th>
                                <Th>User Name</Th>
                                <Th>Phone Number</Th>
                                <Th>Email</Th>
                                <Th>Property Listed</Th>
                                <Th>Service Listed</Th>
                                <Th>Action</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedUser.map((userall) => {
                                return (

                                    <Tr>
                                        <Td>{userall._id}</Td>
                                        <Td>{userall.fname}</Td>
                                        <Td >{userall.phone}</Td>
                                        <Td>{userall.email}</Td>
                                        <Td>{userall.package.length}</Td>
                                        <Td>{userall.service.length}</Td>
                                        <Td >
                                            <Flex gap={4}>

                                                <IconButton
                                                    variant='outline'
                                                    colorScheme='teal'
                                                    aria-label='Call Sage'
                                                    fontSize='20px'
                                                    icon={<AiOutlineDelete />}
                                                    onClick={() => {
                                                        setUserID(userall._id);
                                                        onOpen();
                                                    }}
                                                />

                                            </Flex>
                                        </Td>
                                    </Tr>)
                            })}
                        </Tbody>

                    </Table>
                </TableContainer>
            </Box>

            {/* model for delete icon */}
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete User </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='bold' mb='1rem'>
                            Do you want to Delete the User?
                        </Text>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {
                            handelDel();
                        }}>

                            Delete
                        </Button>

                        <Button variant='ghost' onClick={onClose} >Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>
    )
}

