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
} from "@chakra-ui/react";

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
        <Flex direction='column' m={5} mt={10} bg="gray.500" align='center'>

          <Heading fontSize='34px' ml={7}>Calculate</Heading>
          <Flex direction="column" alignItems='center' mt={10}>

            <Box width='60%' >
              <NumberInput precision={2}  >
                <NumberInputField placeholder="Enter value" h={20} />

              </NumberInput>
            </Box>

            <Box width='60%' >
              <Select placeholder='Select option' h={14}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
            </Box>

          </Flex>

          <Heading fontSize='24px' mt={10}>Equals</Heading>

          <Flex direction="column" alignItems='center' mt={10}>

            <Box width='60%' >
              <NumberInput precision={2}  >
                <NumberInputField placeholder="Enter value" h={20} />

              </NumberInput>
            </Box>

            <Box width='60%' >
              <Select placeholder='Select option' h={14}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
            </Box>

          </Flex>

          <Button colorScheme='teal' size='lg' mt={10}>
            Button
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

    </SimpleGrid>



  );
};

