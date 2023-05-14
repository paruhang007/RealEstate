import {
  Flex,
  Box,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
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
import { GrView } from "react-icons/gr";
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
  const [servImg, setServImg] = useState("");

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
            serv.serOname.toLowerCase().includes(search.toLowerCase()) ||
            serv.userId.toLowerCase().includes(search.toLowerCase())
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
            return serv.status.toString() === select;
          })
        : service
    );
  };

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);

  const loaddata = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAllReview", {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  // set the property id to the state
  const [servID, setServID] = useState("");

  const handel = async () => {
    try {
      const response = await fetch("http://localhost:4000/editReview", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: servID,
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
              <option value="Resolved">Resolved </option>
              <option value="Unresolved">Unresolved </option>
            </Select>
          </Box>
        </Flex>

        <TableContainer m={5}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>User Name</Th>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th>Image</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {selectedServiceType.map((serv) => {
                return (
                  <Tr>
                    <Td>{serv.userId}</Td>
                    <Td>{serv.serOname}</Td>
                    <Td>{serv.serType}</Td>
                    <Td>{serv.serDesc}</Td>
                    <Td>
                      <Image
                        boxSize="100px"
                        objectFit="cover"
                        src={serv.img}
                        alt="Image file"
                      />
                    </Td>
                    <Td>{serv.status}</Td>

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
                          icon={<GrView />}
                          onClick={() => {
                            setServImg(serv.img);
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
              Do you want to Edit the Grevance?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handel();
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

      {/* model for view icon */}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image View </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              objectFit="cover"
              boxSize="450px"
              src={servImg}
              alt="Image file"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
