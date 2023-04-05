import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  CheckboxGroup,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function AddProperty() {
  return (
    <Flex
      minH={"100vh"}
      bg={useColorModeValue("gray.50", "gray.800")}
      w={"full"}
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
                <Input type="text" />
              </FormControl>
            </Box>
          </HStack>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <Select placeholder="For" isrequired>
                <option value="Rent">Rent </option>
                <option value="Sale">Sale </option>
                <option value="Lease">Lease </option>
              </Select>
            </Box>
            <Box>
              <Select placeholder="Property Type" isrequired>
                <option value="Land">Land </option>
                <option value="Flat">Flat </option>
                <option value="House">House </option>
                <option value="Apartment">Apartment </option>
                <option value="Office space">Office space </option>
                <option value="Shop space">Shop space </option>
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
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="district" isRequired>
                <FormLabel>District </FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="municipality" isRequired>
                <FormLabel>Municipality</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>

            <Box>
              <FormControl id="ward" isRequired>
                <FormLabel>Ward Number</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="tol" isRequired>
                <FormLabel>Area / Street name</FormLabel>
                <Input type="text" />
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
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="road" isRequired>
                <FormLabel>Road Size </FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="area" isRequired>
                <FormLabel>Area</FormLabel>
                <Input type="text" placeholder="Mention Unit" />
              </FormControl>
            </Box>
            <Box>
              <Select placeholder="Unit Type" isrequired mt={7}>
                <option value="Rent">Hilly Area </option>
                <option value="Sale">Terai Area </option>
                <option value="Lease">Standard sq meter/ft </option>
              </Select>
            </Box>
          </HStack>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={7}>
            Amenities and Featurees
          </Text>

          <Box mt={5}>
            <CheckboxGroup colorScheme="green">
              <Stack spacing={[5]} direction={["column", "row"]}>
                <Checkbox value="Drainage">Drainage</Checkbox>
                <Checkbox value="Drinking">Drinking Water</Checkbox>
                <Checkbox value="parking">Parking</Checkbox>
                <Checkbox value="Dining ">Dining Room</Checkbox>
                <Checkbox value="Kitchen">Kitchen</Checkbox>
                <Checkbox value="Bedrom">Bedroom</Checkbox>
                <Checkbox value="Earth">Earthquake Resistance</Checkbox>
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
            />
          </FormControl>

          <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
            Payment Details
          </Text>

          <HStack gap={5} align={"center"} mt={5}>
            <Box>
              <FormControl id="price" isRequired>
                <FormLabel>Enter Price </FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <Select placeholder="Unit Type" isrequired mt={7}>
                <option value="Rent">Per Month </option>
                <option value="Sale">Per Year </option>
                <option value="Lease">For Sale </option>
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
