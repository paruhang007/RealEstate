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
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function MyServices() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const [service, setService] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(service);

  const [search, setSearch] = useState(false);

  // getting the token from local storage
  const data = localStorage.getItem("tokenAdmin");
  useEffect(() => {
    if (data) {
      navigate("/admindash/allservices");
    }
    if (!data) {
      navigate("/loginadmin");
    }
  }, [data]);

  // search handler
  const searchHandler = (e) => {
    const search = e.target.value;
    console.log(search);
    setSearch(search);

    if (search.length === 0) {
      setSelectedServiceType(service);
    } else {
      setSelectedServiceType(
        service.filter((serv) => {
          return (
            serv.serName.toLowerCase().includes(search.toLowerCase()) ||
            serv._id.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  };

  // sort handler
  const handelsort = (e) => {
    const select = e.target.value;
    console.log(select);

    // sorting the services according to the service type selected
    setSelectedServiceType(
      select !== "all"
        ? service.filter((serv) => {
            // checking if the service type is equal to the selected service type
            return serv.verifiedService.toString() === select;
          })
        : service
    );
  };

  const loaddata = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAllService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const serv = await response.json();
      // gets the data from the database by filtering only services from different users
      console.log(serv.data);

      // mapping the data to get only the service
      const data = serv.data.map((serv) => {
        return serv.service;
      });
      setService(data);
      console.log(data);
      setSelectedServiceType(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  // set the property id to the state
  const [servID, setServID] = useState("");

  const handelDel = async () => {
    try {
      const response = await fetch("http://localhost:4000/deleteService", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          servId: servID,
        }),
      });
      const serv = await response.json();
      console.log(serv);
      loaddata();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex w={"full"} bg={useColorModeValue("white", "gray.700")}>
      <Box m={2} w={"full"}>
        <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"} ml={5}>
          My Services
        </Text>
        <Flex m={5} gap={5}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color={"black"}>
              <AiOutlineSearch />
            </InputLeftElement>
            <Input
              type="tel"
              onChange={(e) => searchHandler(e)}
              placeholder="Search using ID or Service Name..."
              color={"black"}
              w={"50%"}
            />
          </InputGroup>

          <Box w={"25%"}>
            <Select
              onChange={(e) => {
                handelsort(e);
              }}
            >
              <option value="all">All</option>
              <option value="true">Paid </option>
              <option value="false">Unpaid </option>
            </Select>
          </Box>
        </Flex>

        <TableContainer m={5}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Service Name</Th>
                <Th>Service Type</Th>
                <Th>Email</Th>
                <Th>Phnoe Number</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedServiceType.map((serv) => {
                return (
                  <Tr>
                    <Td>{serv._id}</Td>
                    <Td>{serv.serName}</Td>
                    <Td>{serv.selectedServiceType}</Td>
                    <Td>{serv.serEmail}</Td>
                    <Td>{serv.serPhone}</Td>
                    <Td>{serv.verifiedService ? "1" : "0"}</Td>
                    <Td>
                      <Flex gap={4}>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          fontSize="20px"
                          icon={<AiOutlineEdit />}
                          onClick={() => {
                            setServID(serv._id);
                            onEditOpen();
                          }}
                        />

                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          fontSize="20px"
                          icon={<AiOutlineDelete />}
                          onClick={() => {
                            setServID(serv._id);
                            onOpen();
                          }}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* model for edit icon */}
      <Modal
        blockScrollOnMount={false}
        isOpen={isEditOpen}
        onClose={onEditClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Service </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to Edit the Service?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                navigate(`/editservice/${user.id}/${servID}`);
              }}
            >
              Edit
            </Button>

            <Button variant="ghost" onClick={onEditClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* model for delete icon */}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Service </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to Delete the Service?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handelDel();
              }}
            >
              Delete
            </Button>

            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
