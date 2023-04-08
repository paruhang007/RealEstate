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
import { ChevronDownIcon } from "@chakra-ui/icons";



export default function EditService() {
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
                        Edit Service
                    </Text>

                    <Text fontSize={"lg"} color={"gray.600"} fontWeight={"bold"} mt={5}>
                        About Service
                    </Text>
                    <HStack gap={5} align={"center"} mt={5} >
                        <Box>
                            <FormControl id="firstName" isRequired >
                                <FormLabel>Service Name / Title</FormLabel>
                                <Input type="text" />
                            </FormControl>
                        </Box>
                    </HStack>

                    <HStack gap={5} align={"center"} mt={5}>

                        <Box>
                            <Select placeholder="Service Type" isrequired>
                                <option value="Hardware">Hardware Store </option>
                                <option value="Plumber">Plumber </option>
                                <option value="Constructions">Constructions </option>
                                <option value="Electrician">Electrician </option>
                                <option value="Carpet">Carpet Fitting</option>
                                <option value="Marbles">Marbles and Tiles </option>
                                <option value="Furniture">Furniture </option>
                                <option value="Solar">Solar Heaters </option>
                                <option value="Metal">Metal Work </option>
                                <option value="Paint">Paint Store</option>
                                <option value="Cleaning">Cleaning Service </option>
                                <option value="Interior">Interior Design </option>
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
                        Contact Information
                    </Text>
                    <HStack gap={5} align={"center"} mt={5}>
                        <Box>
                            <FormControl id="name" isRequired>
                                <FormLabel>Owner name</FormLabel>
                                <Input type="text" />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="number" isRequired>
                                <FormLabel>Phone Number </FormLabel>
                                <Input type="text" />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" />
                            </FormControl>
                        </Box>


                    </HStack>




                    <FormControl id="oldpassword" isRequired mt={7}>
                        <FormLabel>Products and Services</FormLabel>
                        <Textarea
                            placeholder="Description"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            h={25}
                        />
                    </FormControl>

                    <FormControl id="oldpassword" isRequired mt={7}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Description"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            h={25}
                        />
                    </FormControl>



                    <Stack spacing={4} mt={4}>

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
