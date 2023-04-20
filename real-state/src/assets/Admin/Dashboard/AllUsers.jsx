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
import { useNavigate } from 'react-router-dom';


export default function AllUsers() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
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
                allUsers.filter((serv) => {
                    return allUsers.serName.toLowerCase().includes(search.toLowerCase()) || serv._id.toLowerCase().includes(allUsers.toLowerCase());
                })
            );
        }
    };


    // search handler
    const handelsort = (e) => {
        const select = e.target.value;
        console.log(select);

        // sorting the allUsers according to the allUsers type selected 
        setSelectedUser(
            select !== "all"
                ? allUsers.filter((serv) => {
                    return serv.setSelectedUser === select;
                })
                : allUsers
        );
    };


    const loaddata = async () => {
        try {
            const response = await fetch('http://localhost:5000/getAllUsers', {
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
                        <Input type="tel" placeholder="Search..." color={'black'} w={'50%'} />
                    </InputGroup>


                    <Box w={'20%'}>
                        <Select placeholder="Catogery" isrequired  >
                            <option value="Rent">Verified </option>
                            <option value="Sale">UnVerified </option>

                        </Select>
                    </Box>
                </Flex>

                <TableContainer m={5}>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>User ID</Th>
                                <Th>User Name</Th>
                                <Th>Phone Number</Th>
                                <Th>Email</Th>
                                <Th>User Status</Th>
                                <Th>Action</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td >25.4</Td>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td >
                                    <Flex gap={4}>
                                        <IconButton
                                            variant='outline'
                                            colorScheme='teal'
                                            aria-label='Call Sage'
                                            fontSize='20px'
                                            icon={<AiOutlineEdit />}
                                            onClick={onOpen} />

                                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Verify User </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Text fontWeight='bold' mb='1rem'>
                                                        Do you want to verify the User?
                                                    </Text>

                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button colorScheme='blue' mr={3} >
                                                        Verify
                                                    </Button>
                                                    <Button colorScheme='blue' mr={3} >
                                                        Un-Verify
                                                    </Button>
                                                    <Button variant='ghost' onClick={onClose} >Close</Button>
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
                                                <ModalHeader>Delete User </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Text fontWeight='bold' mb='1rem'>
                                                        Do you want to Delete the User?
                                                    </Text>

                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button colorScheme='blue' mr={3} >
                                                        Delete
                                                    </Button>

                                                    <Button variant='ghost' onClick={onClose} >Close</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Flex>
                                </Td>
                            </Tr>

                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>User ID</Th>
                                <Th>User Name</Th>
                                <Th>Phone Number</Th>
                                <Th>Email</Th>
                                <Th>User Status</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>

        </Flex>
    )
}

