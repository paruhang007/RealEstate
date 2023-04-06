import React from "react";
import {
  chakra,
  Box,
  Flex,
  Input,
  SimpleGrid,
  Button,
  InputGroup,
  InputRightElement,
  Image,
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
  const [val1, setval1] = useState("");
  const [val2, setval2] = useState("");
  const [result, setResult] = useState("");

  const divide = () => {

    // Convert the inputs from strings to numbers
    const parsedNum1 = parseFloat(num1);
    const parsedVal1 = val1;
    const parsedVal2 = val2;

    if (parsedVal1 == 'Ropani' && parsedVal2 == 'Ropani') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Anna') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Paisa') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Daam') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Bigha') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Kattha') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Dhur') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'Meter') {
      const result = parsedNum1;
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'Feet') {
      const result = parsedNum1;
      setResult(result);

      // ropani conversion starts here
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Anna') {
      const result = parsedNum1 * 16;
      setResult(result);
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Paisa') {
      const result = parsedNum1 * 16 * 4;
      setResult(result);
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Daam') {
      const result = parsedNum1 * 16 * 4 * 4;
      setResult(result);
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1 * 16 * 4 * 4 * 1.99) / 6772;
      setResult(result);
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Kattha') {
      const result = (parsedNum1 * 16 * 4 * 4 * 1.99) / 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Dhur') {
      const result = (parsedNum1 * 16 * 4 * 4 * 1.99) / 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Meter') {
      const result = parsedNum1 * 16 * 4 * 4 * 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Ropani' && parsedVal2 == 'Feet') {
      const result = parsedNum1 * 16 * 4 * 4 * 21.39;
      setResult(result);
    }

    // Anna conversion starts here
    else if (parsedVal1 == 'Anna' && parsedVal2 == 'Ropani') {
      const result = parsedNum1 / 16;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Paisa') {
      const result = parsedNum1 * 4;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Daam') {
      const result = parsedNum1 * 4 * 4;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1 * 4 * 4 * 1.99) / 6772;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Kattha') {
      const result = (parsedNum1 * 4 * 4 * 1.99) / 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Dhur') {
      const result = (parsedNum1 * 4 * 4 * 1.99) / 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Meter') {
      const result = parsedNum1 * 4 * 4 * 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Anna' && parsedVal2 == 'Feet') {
      const result = parsedNum1 * 4 * 4 * 21.39;
      setResult(result);
    }

    // Paisa conversion starts here
    else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Ropani') {
      const result = parsedNum1 / (16 * 4);
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Anna') {
      const result = parsedNum1 / 4;
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Daam') {
      const result = parsedNum1 * 4;
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1 * 4 * 1.99) / 6772;
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Kattha') {
      const result = (parsedNum1 * 4 * 1.99) / 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Dhur') {
      const result = (parsedNum1 * 4 * 1.99) / 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Meter') {
      const result = parsedNum1 * 4 * 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Paisa' && parsedVal2 == 'Feet') {
      const result = parsedNum1 * 4 * 21.39;
      setResult(result);
    }

    // Daam conversion starts here
    else if (parsedVal1 == 'Daam' && parsedVal2 == 'Ropani') {
      const result = parsedNum1 / (16 * 4 * 4);
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Anna') {
      const result = parsedNum1 / (16 * 4);
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Paisa') {
      const result = parsedNum1 / 4;
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1 * 1.99) / 6772;
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Kattha') {
      const result = (parsedNum1 * 1.99) / 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Dhur') {
      const result = (parsedNum1 * 1.99) / 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Meter') {
      const result = parsedNum1 * 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Daam' && parsedVal2 == 'Feet') {
      const result = parsedNum1 * 21.39;
      setResult(result);
    }

    // Bigha conversion starts here
    else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Ropani') {
      const result = (parsedNum1 * 6772) / (16 * 4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Anna') {
      const result = (parsedNum1 * 6772) / (4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Paisa') {
      const result = (parsedNum1 * 6772) / (4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Daam') {
      const result = (parsedNum1 * 6772) / 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Kattha') {
      const result = (parsedNum1 * 6772) / 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Dhur') {
      const result = (parsedNum1 * 6772) / 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Meter') {
      const result = parsedNum1 * 6772;
      setResult(result);
    } else if (parsedVal1 == 'Bigha' && parsedVal2 == 'Feet') {
      const result = (parsedNum1 * 20 * 20 * 182.25);
      setResult(result);
    }

    // Kattha conversion starts here
    else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Ropani') {
      const result = (parsedNum1 * 338.6) / (16 * 4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Anna') {
      const result = (parsedNum1 * 338.6) / (4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Paisa') {
      const result = (parsedNum1 * 338.6) / (4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Daam') {
      const result = (parsedNum1 * 338.6) / 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1 * 338.6) / 6772;
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Dhur') {
      const result = (parsedNum1 * 338.6) / 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Meter') {
      const result = parsedNum1 * 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Kattha' && parsedVal2 == 'Feet') {
      const result = (parsedNum1 * 20 * 182.25);
      setResult(result);
    }

    // Dhur conversion starts here
    else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Ropani') {
      const result = (parsedNum1 * 16.93) / (16 * 4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Anna') {
      const result = (parsedNum1 * 16.93) / (4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Paisa') {
      const result = (parsedNum1 * 16.93) / (4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Daam') {
      const result = (parsedNum1 * 16.93) / 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1 * 16.93) / 6772;
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'kattha') {
      const result = (parsedNum1 * 16.93) / 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Meter') {
      const result = parsedNum1 * 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Dhur' && parsedVal2 == 'Feet') {
      const result = parsedNum1 * 182.25;
      setResult(result);
    }

    // Meter conversion starts here
    else if (parsedVal1 == 'Meter' && parsedVal2 == 'Ropani') {
      const result = (parsedNum1) / (16 * 4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'Anna') {
      const result = (parsedNum1) / (4 * 4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'Paisa') {
      const result = (parsedNum1) / (4 * 1.99);
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'Daam') {
      const result = (parsedNum1) / 1.99;
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1) / 6772;
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'kattha') {
      const result = (parsedNum1) / 338.6;
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'Dhur') {
      const result = parsedNum1 / 16.93;
      setResult(result);
    } else if (parsedVal1 == 'Meter' && parsedVal2 == 'Feet') {
      const result = (parsedNum1 * 185.25) / 16.93;
      setResult(result);
    }

    // Feet conversion starts here
    else if (parsedVal1 == 'Feet' && parsedVal2 == 'Ropani') {
      const result = (parsedNum1) / (16 * 4 * 4 * 21.39);
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'Anna') {
      const result = (parsedNum1) / (4 * 4 * 21.39);
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'Paisa') {
      const result = (parsedNum1) / (4 * 21.39);
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'Daam') {
      const result = (parsedNum1) / 21.39;
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'Bigha') {
      const result = (parsedNum1) / 6772 * 21.39;
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'kattha') {
      const result = (parsedNum1) / 338.6 * 21.39;
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'Dhur') {
      const result = parsedNum1 / 16.93 * 21.39;
      setResult(result);
    } else if (parsedVal1 == 'Feet' && parsedVal2 == 'Meter') {
      const result = (parsedNum1 * 16.93) / 185.25;
      setResult(result);
    }


    else {
      setResult("please select the options and enter number")
    }

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
                  value={val1}
                  onChange={(e) => setval1(e.target.value)}
                >
                  <option value='Ropani'>Ropani</option>
                  <option value='Anna'>Anna</option>
                  <option value='Paisa'>Paisa</option>
                  <option value='Daam'>Daam</option>
                  <option value='Bigha'>Bigha</option>
                  <option value='Kattha'>Kattha</option>
                  <option value='Dhur'>Dhur</option>
                  <option value='Meter'>Meter Square</option>
                  <option value='Feet'>Feet Square</option>
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
              <Input placeholder=" Answer " h={20} borderWidth='2px' borderColor={'blue.200'} value={result}>
              </Input>
            </Box>

            <Box width='60%' >
              <FormControl id="value2">
                <Select placeholder='Select option' h={14} borderWidth='2px' borderColor={'blue.200'}
                  type="value2"
                  value={val2}
                  onChange={(e) => setval2(e.target.value)}
                >
                  <option value='Ropani'>Ropani</option>
                  <option value='Anna'>Anna</option>
                  <option value='Paisa'>Paisa</option>
                  <option value='Daam'>Daam</option>
                  <option value='Bigha'>Bigha</option>
                  <option value='Kattha'>Kattha</option>
                  <option value='Dhur'>Dhur</option>
                  <option value='Meter'>Meter Square</option>
                  <option value='Feet'>Feet Square</option>
                </Select>
              </FormControl>
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

