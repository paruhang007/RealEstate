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


export default function MyProperties() {
    const { isOpen, onOpen, onClose } = useDisclosure()
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


                    <Box w={'20%'}>
                        <Select placeholder="Catogery" isrequired  >
                            <option value="Rent">Rent </option>
                            <option value="Sale">Sale </option>
                            <option value="Lease">Lease </option>
                        </Select>
                    </Box>
                    <Box w={'25%'} >
                        <Select placeholder="Property Type" isrequired>
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
                                <Th>Property Type</Th>
                                <Th>Status</Th>
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
                                                <ModalHeader>Delete Property </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Text fontWeight='bold' mb='1rem'>
                                                        Do you want to Delete the Property?
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
                                <Th>ID</Th>
                                <Th>Property</Th>
                                <Th>Property Type</Th>
                                <Th>Property Type</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>

        </Flex>
    )
}

