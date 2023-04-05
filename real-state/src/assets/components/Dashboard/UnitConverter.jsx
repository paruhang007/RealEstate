import React from "react";
import {
  chakra,
  Box,
  Flex,
  Badge,
  Input,
  VisuallyHidden,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
  Grid,
  GridItem,
  Text,
  Stack,
  Heading,
  Select,
  NumberInputField,
  NumberInput,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";

function Smbox({ title, desc, }) {
  return (
    <Box p={5} shadow='md' borderWidth='1px' >

      <Text mt={4} fontSize='l' fontWeight="bold">{title}</Text>
      <Text mt={4}  >Equals</Text>
      <Text mt={4} fontSize='l' fontWeight="bold">{desc}</Text>
    </Box>
  )
}








export default function UnitConverter() {
  const [num1, setNum1] = useState("");
  const [val, setval] = useState("");
  const [result, setResult] = useState("");

  const divide = () => {

    // Convert the inputs from strings to numbers
    const parsedNum1 = parseFloat(num1);
    const parsedVal = val;


    const result = parsedNum1 / 4;
    setResult(result);

  };

  return (
    // hero section starts here
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      _after={{
        bg: "brand.500",
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
    >
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 20 }}
        py={24}
      >

        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color="brand.600"
          _dark={{ color: "gray.300" }}
          lineHeight="shorter"
        >
          GharJagga tools.
          Enjoy the benefits of our Unit Converter.
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="sm"
          color="brand.600"
          _dark={{ color: "gray.400" }}
          letterSpacing="wider"
        >
          Nepal has a differnt unit system than the rest of the world. It even varies from hilly and terai area.
          We have created a tool to help you convert the units easily.
        </chakra.p>
      </Flex>
      <Box>
        <Image
          // boxSize="200px"
          height="200px"
          width="300px"
          src="images/calculate.png"
          alt="calculator image"
          fit="cover"

          w="full"
          h={{ base: 64, md: "full" }}
          bg="gray.100"
          loading="lazy"
        />
      </Box>



      <Box bg="gray.100">
        <Flex direction='column' m={5} mt={10} align='center'>

          <Heading fontSize='34px' ml={7}>Calculate</Heading>
          <Flex direction="column" alignItems='center' mt={10} w={'100%'}>

            <Box width='60%' >
              <FormControl id="number1">
                <NumberInput precision={2} >
                  <NumberInputField
                    placeholder="Enter value" h={20} borderWidth='2px' borderColor={'blue.200'}
                    type="number1"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                  />

                </NumberInput>
              </FormControl>
            </Box>

            <Box width='60%' >
              <FormControl id="value1">
                <Select placeholder='Select option' h={14} borderWidth='2px' borderColor={'blue.200'}
                  type="value1"
                  value={val}
                  onChange={(e) => setval(e.target.value)}
                >
                  <option value='option1'>Ropani</option>
                  <option value='option2'>Anna</option>
                  <option value='option3'>Paisa</option>
                  <option value='option1'>Daam</option>
                  <option value='option2'>Bigha</option>
                  <option value='option3'>Kattha</option>
                  <option value='option1'>Dhur</option>
                  <option value='option2'>Meter </option>
                  <option value='option3'>Feet</option>
                </Select>
              </FormControl>
            </Box>

          </Flex>

          <Heading fontSize='24px' mt={10}>Equals</Heading>

          <Flex direction="column" alignItems='center' mt={10} w={'100%'}>

            <Box width='60%' >
              {/* <NumberInput precision={2}  >
                <NumberInputField placeholder="Enter value" h={20} borderWidth='2px' borderColor={'blue.200'} value={result} />
                <p>The result of the division is: {result}</p>
              </NumberInput> */}
              <Input precision={2} h={20} borderWidth='2px' borderColor={'blue.200'} value={result}>
              </Input>
            </Box>

            <Box width='60%' >
              <Select placeholder='Select option' h={14} borderWidth='2px' borderColor={'blue.200'} >
                <option value='option1'>Ropani</option>
                <option value='option2'>Anna</option>
                <option value='option3'>Paisa</option>
                <option value='option1'>Daam</option>
                <option value='option2'>Bigha</option>
                <option value='option3'>Kattha</option>
                <option value='option1'>Dhur</option>
                <option value='option2'>Meter </option>
                <option value='option3'>Feet</option>
              </Select>
            </Box>

          </Flex>

          <Button onClick={divide} colorScheme='teal' size='lg' my={10} >
            Calculate
          </Button>

        </Flex>
      </Box>


      {/* this part is for information about units */}
      <Flex direction="column" m={5} mt={10}  >

        <Heading fontSize='34px' ml={7}>Locally used unit Information</Heading>

        <Heading fontSize='xl' ml={7} mt={18}>Hilly Area measurements</Heading>
        <Stack spacing={8} direction='row' margin={5}>
          <Smbox
            title='1 Ropani'
            desc='16 Anna'
          />
          <Smbox
            title='1 Anna'
            desc='4 Paisa'
          />
          <Smbox
            title='1 Paisa'
            desc='4 Daam'
          />
          <Smbox
            title='1 Daam'
            desc='1.99 Mtr. Sqr.'
          />
          <Smbox
            title='1 Daam'
            desc='21.39 Sq. Ft.'
          />
        </Stack>

        <Heading fontSize='xl' ml={7} mt={18}>Terai Area measurements</Heading>
        <Stack spacing={8} direction='row' margin={5}>
          <Smbox
            title='1 Bigha'
            desc='20 Kattha'
          />
          <Smbox
            title='1 Kattha'
            desc='20 Dhur'
          />
          <Smbox
            title='1 Dhur'
            desc='16.93 Mtr. Sqr.'
          />
          <Smbox
            title='1 Dhur'
            desc='182.25 Sq. Ft.'
          />

        </Stack>
      </Flex>

    </SimpleGrid >



  );
};

