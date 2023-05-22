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
import { useToast } from "@chakra-ui/react";

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
  const [userID, setUserID] = useState("");

  const toast = useToast();

  // getting the token from local storage
  const data = localStorage.getItem("tokenAdmin");
  useEffect(() => {
    if (data) {
      navigate("/admindash/allproperties");
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
      setProperty(prop.data);
      setSelectedPropertyType(prop.data);

      // mapping the data to get only the property
      // const data = prop.data.map((prop) => {
      //   return prop.package;
      // });
      // console.log(data);
      // setProperty(data);
      // setSelectedPropertyType(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  // edit handler for the property to delete
  const handelDel = async () => {
    try {
      const response = await fetch("http://localhost:4000/deletePack", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userID,
          packId: propID,
        }),
      });
      const prop = await response.json();
      //console.log(prop);
      toast({
        title: "Property Deleted",
        description: "Property has been deleted",
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
      const response = await fetch("http://localhost:4000/verifyProp", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userID,
          packId: propID,
        }),
      });
      const serv = await response.json();

      toast({
        title: "Property Verified",
        description: "Property has been verified",
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
                    <Td>{prop.package._id}</Td>
                    <Td>{prop.package.propName}</Td>
                    <Td>{prop.package.selectedPropertyType}</Td>
                    <Td>{prop.package.selectedFor}</Td>

                    <Td>{prop.package.verified ? "1" : "0"}</Td>
                    <Td>
                      <Flex gap={4}>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          fontSize="20px"
                          icon={<AiOutlineEdit />}
                          onClick={() => {
                            setPropID(prop.package._id);
                            setUserID(prop._id);
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
                            setPropID(prop.package._id);
                            setUserID(prop._id);
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
