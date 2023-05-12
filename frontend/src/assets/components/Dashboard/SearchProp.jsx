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
  Grid,
  GridItem,
  Button,
  FormControl,
  FormLabel,
  SimpleGrid,
  Image,
  Badge,
  Divider,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function SearchProp() {
  const [property, setProperty] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(property);
  const [selectedFor, setSelectedFor] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState(false);

  const navigate = useNavigate();

  // load data into the table
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
      // const data = prop.data.map(
      //     (prop) => {
      //         return prop.package
      //     }
      // )
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
            prop.package.propName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            prop.package._id.toLowerCase().includes(search.toLowerCase())
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
              return prop.package.selectedFor === selectedFor;
            })
          : property
      );
    } else {
      setSelectedPropertyType(
        selectedFor !== "all"
          ? property.filter((prop) => {
              return (
                prop.package.selectedFor === selectedFor &&
                prop.package.selectedPropertyType === select
              );
            })
          : property.filter((prop) => {
              return prop.package.selectedPropertyType === select;
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
              return prop.package.selectedPropertyType === selectedType;
            })
          : property
      );
    } else {
      setSelectedPropertyType(
        selectedType !== "all"
          ? property.filter((prop) => {
              return (
                prop.package.selectedFor === select &&
                prop.package.selectedPropertyType === selectedType
              );
            })
          : property.filter((prop) => {
              return prop.package.selectedFor === select;
            })
      );
    }
  };

  // for pagination buttons
  const PagButton = (props) => {
    const activeStyle = {
      bg: "brand.600",
      _dark: { bg: "brand.500" },
      color: "white",
    };

    return (
      <chakra.button
        mx={1}
        px={4}
        py={2}
        rounded="md"
        bg="white"
        _dark={{ bg: "gray.800" }}
        color="gray.700"
        opacity={props.disabled && 0.6}
        _hover={!props.disabled && activeStyle}
        cursor={props.disabled && "not-allowed"}
        {...(props.active && activeStyle)}
        display={props.p && !props.active && { base: "none", sm: "block" }}
      >
        {props.children}
      </chakra.button>
    );
  };

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={3} py={5} px={10} bg="gray.100">
      <GridItem colStart={1} colEnd={3}>
        <Flex
          m={10}
          borderWidth="1px"
          borderColor={"black.200"}
          bg={"#ffffff"}
          display={"colum"}
        >
          <FormLabel m={3}>Ease your search</FormLabel>

          <Box m={5}>
            <FormLabel>Property status</FormLabel>

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

            <Divider mt={5} />

            <FormLabel mt={5}>Property Type</FormLabel>
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
      </GridItem>

      <GridItem colStart={3} colEnd={7} minH={"500"} justify={"center"}>
        <Flex
          m={5}
          minH={"300"}
          direction={"column"}
          borderWidth="1px"
          borderColor={"black.200"}
          bg={"#ffffff"}
        >
          {/* search bar and quick sort  */}
          <Flex m={5} gap={5} align={"center"}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color={"black"}>
                <AiOutlineSearch />
              </InputLeftElement>
              <Input
                type="tel"
                onChange={(e) => searchHandler(e)}
                placeholder="Search using ID or Property Name..."
                color={"black"}
                w={"60%"}
              />
            </InputGroup>

            <Flex w={"50%"} align={"center"}>
              <Text fontSize={"sm"} color={"gray.600"} w={"30%"}>
                Sort By:
              </Text>
              <Select
                placeholder="Catogery"
                isrequired
                defaultValue={"latest"}
                w={"70%"}
                fontSize={14}
              >
                <option value="latest">Latest First </option>
                <option value="high">Price high to low </option>
                <option value="low">Price low to high </option>
              </Select>
            </Flex>
          </Flex>

          {/* another div for viewing products */}

          <Flex mt={5}>
            <SimpleGrid minChildWidth="200px" spacing="40px" w={"full"} m={5}>
              {selectedPropertyType.map((prop) => {
                return (
                  <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    borderColor={"blue.200"}
                  >
                    <Image
                      src={prop.package.img}
                      alt={"property image"}
                      objectFit={"cover"}
                      onClick={() => {
                        navigate(`/detail/${prop._id}/${prop.package._id}`);
                      }}
                    />

                    <Box p="6">
                      <Flex align={"center"}>
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {prop.package.propName}
                        </Box>
                      </Flex>

                      <Flex gap={2}>
                        <Box>{prop.package.propPrice}</Box>

                        <Box>{prop.package.selectedPayment}</Box>
                      </Flex>

                      <Flex
                        as="span"
                        color="gray.600"
                        fontSize="sm"
                        direction={"row"}
                        mt={2}
                        align="center"
                      >
                        <GoLocation /> {prop.package.propState},{" "}
                        {prop.package.propDist}, {prop.package.propStreet}
                      </Flex>

                      <Box display="flex" alignItems="baseline" m={3} gap={2}>
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          {prop.package.selectedFor}
                        </Badge>

                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          {prop.package.selectedPropertyType}
                        </Badge>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>

            {/* navigate pages */}
            {/* <Flex>
                            <PagButton>
                                <Icon
                                    as={IoIosArrowBack}
                                    color="gray.700"
                                    _dark={{ color: "gray.200" }}
                                    boxSize={4}
                                />
                            </PagButton>
                            <PagButton p>1</PagButton>
                            <PagButton p active>
                                2
                            </PagButton>
                            <PagButton p>3</PagButton>
                            <PagButton p>4</PagButton>
                            <PagButton p>5</PagButton>
                            <PagButton>
                                <Icon
                                    as={IoIosArrowForward}
                                    color="gray.700"
                                    _dark={{ color: "gray.200" }}
                                    boxSize={4}
                                />
                            </PagButton>
                        </Flex> */}
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}
