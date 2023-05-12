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

export default function AllProperty() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const [property, setProperty] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(property);
  const [editProp, setEditProp] = useState("");

  const [search, setSearch] = useState(false);

  const [propID, setPropID] = useState("");

  // search handler
  const searchHandler = (e) => {
    const search = e.target.value;
    console.log(search);
    setSearch(search);

    if (search.length === 0) {
      setSelectedPropertyType(property);
    } else {
      setSelectedPropertyType(
        property.filter((prop) => {
          return (
            prop.propName.toLowerCase().includes(search.toLowerCase()) ||
            prop._id.toLowerCase().includes(search.toLowerCase())
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
    setSelectedPropertyType(
      select !== "all"
        ? property.filter((prop) => {
            // checking if the property type is equal to the selected property type

            return prop.verified.toString() === select;
          })
        : property
    );
  };

  const loaddata = async () => {
    try {
      const response = await fetch("http://localhost:4000/getAllProp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const prop = await response.json();
      // gets the data from the database by filtering only property from different users
      console.log(prop.data);

      // mapping the data to get only the property
      const data = prop.data.map((prop) => {
        return prop.package;
      });
      console.log(data);
      setProperty(data);
      setSelectedPropertyType(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <Flex w={"full"} bg={useColorModeValue("white", "gray.700")}>
      <Box m={2} w={"full"}>
        <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"} ml={5}>
          All Properties
        </Text>
        <Flex m={5} gap={5}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color={"black"}>
              <AiOutlineSearch />
            </InputLeftElement>
            <Input
              type="tel"
              onChange={(e) => searchHandler(e)}
              placeholder="Search using ID or Property Name..."
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
                <Th>Property ID</Th>

                <Th>Property Name</Th>
                <Th>Property Type</Th>
                <Th>Property Catogery</Th>
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
                    <Td>{prop.selectedPropertyType}</Td>
                    <Td>{prop.selectedFor}</Td>

                    <Td>{prop.verified ? "1" : "0"}</Td>
                    <Td>
                      <Flex gap={4}>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          fontSize="20px"
                          icon={<AiOutlineEdit />}
                          onClick={() => {
                            setPropID(prop._id);
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
                            setPropID(prop._id);
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
          <ModalHeader>Verify Property </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to Verify the Property?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                navigate(`/editproperty/${user.id}/${propID}`);
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
          <ModalHeader>Delete Property </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to Delete the Property?
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
