import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  Select,
  CheckboxGroup,
  Checkbox,
  Textarea,

} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";



export default function AddProperty() {

  // const { isloaded } = useLoadScript({
  //   googleMapApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  // });

  // if (!isloaded) return <div>"Loading Maps"</div>;
  // return <Map />;

  const [propName, setPropName] = useState("");
  const [propState, setPropState] = useState("");
  const [propDist, setPropDist] = useState("");
  const [propMuni, setPropMuni] = useState("");
  const [propWard, setPropWard] = useState("");
  const [propStreet, setPropStreet] = useState("");
  const [propFace, setPropFace] = useState("");
  const [propRoad, setPropRoad] = useState("");
  const [propArea, setPropArea] = useState("");
  const [propDesc, setPropDesc] = useState("");
  const [propPrice, setPropPrice] = useState("");


  const [selectedFor, setSelectedFor] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedPropertyUnit, setSelectedPropertyUnit] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');


  // handle select change for "For"
  function handleForSelectChange(event) {
    setSelectedFor(event.target.value);
  }

  // handle select change for "Property Type"
  function handlePropertyTypeSelectChange(event) {
    setSelectedPropertyType(event.target.value);
  }

  // handle select change for "Unit Type"
  function handleForSelectUnit(event) {
    setSelectedPropertyUnit(event.target.value);
  }

  // handle select change for "Unit Type"
  function handleForPayment(event) {
    setSelectedPayment(event.target.value);
  }


  // use state for checkbox
  const [checkboxValues, setCheckboxValues] = useState({
    Drainage: false,
    Drinking: false,
    parking: false,
    Dining: false,
    Kitchen: false,
    Bedroom: false,
    Earth: false,
  });

  // handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckboxValues({
      ...checkboxValues,
      [value]: checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const response = fetch("http://localhost:5000/addPack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/jason",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          propName,
          propState,
          propDist,
          propMuni,
          propWard,
          propStreet,
          propFace,
          propRoad,
          propArea,
          propDesc,
          propPrice,
          selectedFor,
          selectedPropertyType,
          selectedPropertyUnit,
          selectedPayment,
          checkboxValues,
          id: "642d1b386e941d8d67492b69"
        }),
      })
    }
    catch (error) {
      console.log(error);
    }
  };


  return (
    <Flex
      minH={"100vh"}
      bg={useColorModeValue("gray.50", "gray.800")}
      w={"full"}
      as={"form"}
      onSubmit={handleSubmit}
    >
      <Stack spacing={8} w={"full"}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Text fontSize={"2xl"} color={"gray.600"} fontWeight={"bold"}>
            Add property
          </Text>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
            About Property
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>Property Name / Title</FormLabel>
                <Input type="text" onChange={(e) => setPropName(e.target.value)} />
              </FormControl>
            </Box>
          </HStack>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <Select placeholder="For" isrequired value={selectedFor} onChange={handleForSelectChange}>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
                <option value="Lease">Lease</option>
              </Select>
            </Box>
            <Box>
              <Select placeholder="Property Type" isrequired value={selectedPropertyType} onChange={handlePropertyTypeSelectChange}>
                <option value="Land">Land</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Office space">Office space</option>
                <option value="Shop space">Shop space</option>
              </Select>
            </Box>
          </HStack>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Property Location
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="state" isRequired>
                <FormLabel>State/Province</FormLabel>
                <Input type="text" onChange={(e) => setPropState(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="district" isRequired>
                <FormLabel>District </FormLabel>
                <Input type="text" onChange={(e) => setPropDist(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="municipality" isRequired>
                <FormLabel>Municipality</FormLabel>
                <Input type="text" onChange={(e) => setPropMuni(e.target.value)} />
              </FormControl>
            </Box>

            <Box>
              <FormControl id="ward" isRequired>
                <FormLabel>Ward Number</FormLabel>
                <Input type="text" onChange={(e) => setPropWard(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="tol" isRequired>
                <FormLabel>Area / Street name</FormLabel>
                <Input type="text" onChange={(e) => setPropStreet(e.target.value)} />
              </FormControl>
            </Box>
          </HStack>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Property Higlights
          </Text>
          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="face" isRequired>
                <FormLabel>Facing</FormLabel>
                <Input type="text" onChange={(e) => setPropFace(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="road" isRequired>
                <FormLabel>Road Size </FormLabel>
                <Input type="text" onChange={(e) => setPropRoad(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="area" isRequired>
                <FormLabel>Area</FormLabel>
                <Input type="text" placeholder="Mention Unit" onChange={(e) => setPropArea(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <Select placeholder="Unit Type" isrequired mt={7} value={selectedPropertyUnit} onChange={handleForSelectUnit}>
                <option value="Hilly Area">Hilly Area </option>
                <option value="Terai Area">Terai Area </option>
                <option value="Standard sq meter/ft">Standard sq meter/ft </option>
              </Select>
            </Box>
          </HStack>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Amenities and Featurees
          </Text>

          <Box mt={5}>
            <CheckboxGroup colorScheme="green">

              <Stack spacing={[5]} direction={["column", "row"]}>
                <Checkbox
                  value="Drainage"
                  isChecked={checkboxValues.Drainage}
                  onChange={handleCheckboxChange}
                >
                  Drainage
                </Checkbox>
                <Checkbox
                  value="Drinking"
                  isChecked={checkboxValues.Drinking}
                  onChange={handleCheckboxChange}
                >
                  Drinking Water
                </Checkbox>
                <Checkbox
                  value="parking"
                  isChecked={checkboxValues.parking}
                  onChange={handleCheckboxChange}
                >
                  Parking
                </Checkbox>
                <Checkbox
                  value="Dining"
                  isChecked={checkboxValues.Dining}
                  onChange={handleCheckboxChange}
                >
                  Dining Room
                </Checkbox>
                <Checkbox
                  value="Kitchen"
                  isChecked={checkboxValues.Kitchen}
                  onChange={handleCheckboxChange}
                >
                  Kitchen
                </Checkbox>
                <Checkbox
                  value="Bedrom"
                  isChecked={checkboxValues.Bedrom}
                  onChange={handleCheckboxChange}
                >
                  Bedroom
                </Checkbox>
                <Checkbox
                  value="Earth"
                  isChecked={checkboxValues.Earth}
                  onChange={handleCheckboxChange}
                >
                  Earthquake Resistance
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>

          <FormControl id="oldpassword" isRequired mt={7}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              _placeholder={{ color: "gray.500" }}
              type="text"
              h={25}
              onChange={(e) => setPropDesc(e.target.value)}
            />
          </FormControl>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
            Payment Details
          </Text>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="price" isRequired>
                <FormLabel>Enter Price </FormLabel>
                <Input type="text" onChange={(e) => setPropPrice(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <Select placeholder="Payment" isrequired mt={7} value={selectedPayment} onChange={handleForPayment}>
                <option value="Per Month">Per Month </option>
                <option value="Per Year">Per Year </option>
                <option value="For Sale">For Sale </option>
              </Select>
            </Box>
          </HStack>

          <Stack spacing={4} mt={4}>
            #
            <Box mt={5}>
              <CheckboxGroup colorScheme="green">
                <Stack spacing={[5]} direction={["column", "row"]}>
                  <Checkbox value="policy" size="md">
                    I Agree To Listing Policy*
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
            <Stack pt={6}></Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
