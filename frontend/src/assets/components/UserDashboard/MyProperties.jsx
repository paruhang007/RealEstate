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
import KhaltiCheckout from "khalti-checkout-web";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import config from "../../khalti/KhaltiConfig";

export default function MyProperties() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isPayOpen,
    onOpen: onPayOpen,
    onClose: onPayClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const [property, setProperty] = useState([]);

  const [selectedFor, setSelectedFor] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPropertyType, setSelectedPropertyType] = useState(property);
  const [editProp, setEditProp] = useState("");

  const [search, setSearch] = useState(false);

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
              return (
                prop.selectedFor === selectedFor &&
                prop.selectedPropertyType === select
              );
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
              return (
                prop.selectedFor === select &&
                prop.selectedPropertyType === selectedType
              );
            })
          : property.filter((prop) => {
              return prop.selectedFor === select;
            })
      );
    }
  };

  // getting the token from local storage
  const data = localStorage.getItem("token");
  // decoding the token which is actually holding the user id
  const user = jwt_decode(data);

  const loaddata = async () => {
    try {
      const response = await fetch("http://localhost:4000/getPackAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      });
      const prop = await response.json();
      setProperty(prop.data);
      console.log(prop.data);
      setSelectedPropertyType(prop.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  // set the property id to the state
  const [propID, setPropID] = useState("");

  const handelDel = async () => {
    try {
      const response = await fetch("http://localhost:4000/deletePack", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          packId: propID,
        }),
      });
      const prop = await response.json();
      console.log(prop);
      loaddata();
    } catch (err) {
      console.log(err);
    }
  };

  // for khalit payment
  let checkout = new KhaltiCheckout(config);

  return (
    <Flex w={"full"} bg={useColorModeValue("white", "gray.700")}>
      <Box m={2} w={"full"}>
        <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"} ml={5}>
          My property
        </Text>
        <Flex w={"100%"} m={5} gap={5}>
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

          {/* for  */}
          <Box w={"20%"}>
            <Select
              onChange={(e) => {
                handleLeige(e);
              }}
            >
              <option value="all">All </option>
              <option value="Rent">Rent </option>
              <option value="Sale">Sale </option>
              <option value="Lease">Lease </option>
            </Select>
          </Box>

          {/* category */}
          <Box w={"25%"}>
            <Select
              isrequired
              onChange={(e) => {
                handlerCate(e);
              }}
            >
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
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Property Name</Th>
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
                    <Td>{prop.selectedPropertyType}</Td>
                    <Td>{prop.selectedFor}</Td>
                    <Td>{prop.propArea}</Td>
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
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          fontSize="20px"
                          icon={<BsCashCoin />}
                          onClick={() => {
                            setPropID(prop._id);

                            //onPayOpen();

                            checkout.show({ amount: 10000 });
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
          <ModalHeader>Edit Property </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to Edit the Property?
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

      {/* model for pay icon */}
      <Modal blockScrollOnMount={false} isOpen={isPayOpen} onClose={onPayClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make Payment </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Do you want to make the Payment?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                // checkout.show({ amount: 1000 });
              }}
            >
              Make Payment
            </Button>

            <Button variant="ghost" onClick={onPayClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
