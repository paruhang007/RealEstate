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

  const data = localStorage.getItem("tokenAdmin");
  const user = data ? jwt_decode(data) : "";
  const start = user.iat;
  const end = user.exp;

  // if the token is expired then navigate to the login page
  if (Date.now() >= end * 1000) {
    toast({
      title: "session expired",
      description: "Your session has been expired. Please login again",
      status: "error",
      duration: 6000,
      isClosable: true,
      position: "top-middle",
    });
    navigate("/login");
    localStorage.removeItem("token");
  }

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
      setService(serv.data);
      setSelectedServiceType(serv.data);

      // mapping the data to get only the service
      // const data = serv.data.map((serv) => {
      //   return serv.service;
      // });
      // setService(data);
      // console.log(data);
      // setSelectedServiceType(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  // set the property id to the state
  const [servID, setServID] = useState("");
  const [userID, setUserID] = useState("");

  const handelDel = async () => {
    try {
      const response = await fetch("http://localhost:4000/deleteService", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userID,
          servId: servID,
        }),
      });
      const serv = await response.json();
      // console.log(serv);
      toast({
        title: "Service Deleted",
        description: "Service has been deleted successfully",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-middle",
      });
      loaddata();
    } catch (err) {
      console.log(err);
    }
  };

  // edit handler
  const handel = async () => {
    try {
      const response = await fetch("http://localhost:4000/verifyService", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userID,
          servId: servID,
        }),
      });
      const serv = await response.json();

      toast({
        title: "Service Verified",
        description: "Service has been verified",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-middle",
      });

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
                    <Td>{serv.service._id}</Td>
                    <Td>{serv.service.serName}</Td>
                    <Td>{serv.service.selectedServiceType}</Td>
                    <Td>{serv.service.serEmail}</Td>
                    <Td>{serv.service.serPhone}</Td>
                    <Td>{serv.service.verifiedService ? "1" : "0"}</Td>
                    <Td>
                      <Flex gap={4}>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          fontSize="20px"
                          icon={<AiOutlineEdit />}
                          onClick={() => {
                            setServID(serv.service._id);
                            setUserID(serv._id);
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
                            setServID(serv.service._id);
                            setUserID(serv._id);
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
          <ModalHeader>Verify Service </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to Verify the Service?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handel();
                onEditClose();
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
                onClose();
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
