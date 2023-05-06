import React from "react";
import {
  chakra,
  Box,
  Flex,
  SimpleGrid,
  Button,
  Image,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Heading,

} from "@chakra-ui/react";

import { useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PieController
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// register the elements to use
ChartJS.register(ArcElement, Tooltip, Legend, PieController);

export default function EmiCalculator() {

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [result, setResult] = useState("");
  const [totalInterest, setResult2] = useState("");
  const [totalPayable, setResult3] = useState("");

  const calEmi = () => {

    // Convert the inputs from strings to numbers
    const parsedNum1 = parseFloat(num1);
    const parsedNum2 = parseFloat(num2);
    const parsedNum3 = parseFloat(num3);

    // Check for invalid inputs
    if (isNaN(parsedNum1) || isNaN(parsedNum2) || isNaN(parsedNum2) || parsedNum1 === 0 || parsedNum2 === 0 || parsedNum3 === 0) {
      setResult("Invalid inputs");
    } else if (parsedNum1 < 0 || parsedNum2 < 0 || parsedNum3 < 0) {
      setResult("please enter positive values");
    }
    else {
      // Calculate the result
      const principal = parsedNum1;             //principal loan amount
      const rate = parsedNum2 / (12 * 100);    //interest rate per month
      const time = parsedNum3 * 12;          //time duration in months

      // Calculate the EMI
      const numerator = principal * rate * Math.pow(1 + rate, time);
      const denominator = Math.pow(1 + rate, time) - 1;
      const result = numerator / denominator;

      const totalInterest = (result * time) - principal;
      const totalPayable = (result * time);

      // totalInterest.toLocaleString("en-US")
      // totalPayable.toLocaleString("en-US")

      setResult(result.toFixed(3));
      setResult2(totalInterest.toFixed(3))
      setResult3(totalPayable.toFixed(3))
    }


  };

  const data = {
    labels: ['Total Interest', 'Principal Loan Amount'],
    datasets: [{
      label: 'EMI Chart',
      data: [(result * 12 * num3) - num1, num1],
      borderColor: 'black',
      backgroundColor: ['#a6dcda', '#319795'],
    }]
  }

  const options = {
    title: "Pie Chart"
  };


  return (
    <Box>
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
            Enjoy the benefits of our EMI Calculator.
          </chakra.h1>

          <chakra.p
            pr={{ base: 0, lg: 16 }}
            mb={4}
            fontSize="sm"
            color="brand.600"
            _dark={{ color: "gray.400" }}
            letterSpacing="wider"
          >
            Calculate your EMI and get the best deal.
          </chakra.p>
        </Flex>
        <Box>
          <Image
            src="images/emi.png"
            alt="emi image"
            fit="cover"
            w="full"
            h={{ base: 64, md: "full" }}
            bg="gray.100"
            loading="lazy"
          />
        </Box>

        {/* Area for EMI Calculator */}
        <Flex width={'100%'} direction={'column'} align={'center'} bg="gray.100" >
          <Box borderRadius={5} border={3} borderColor={'blue.100'} bg={'white'} width={'80%'} m={5}>
            <Heading fontSize='24px' mt={8} pl={3}>EMI Calculator</Heading>

            <Box m={4}>

              <FormControl id="loan">
                <FormLabel>Loan Amount</FormLabel>
                <NumberInput type="number">
                  <NumberInputField
                    placeholder="Enter Loan Amount"
                    fontWeight={'bold'}
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                  />
                </NumberInput>
              </FormControl>
              <FormControl id="Interest">
                <FormLabel>Interrest rate</FormLabel>
                <NumberInput type="number">
                  <NumberInputField
                    placeholder="Enter Interesr Rate"
                    fontWeight={'bold'}
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                  />
                </NumberInput>
              </FormControl>
              <FormControl id="Time">
                <FormLabel>Time Duration</FormLabel>
                <NumberInput type="number" >
                  <NumberInputField
                    placeholder="Enter Time Duration"
                    fontWeight={'bold'}
                    type="number"
                    value={num3}
                    onChange={(e) => setNum3(e.target.value)}
                  />
                </NumberInput>
              </FormControl>

              <Button onClick={calEmi} colorScheme='teal' size='lg' my={10} >
                Calculate
              </Button>
            </Box>
          </Box>
        </Flex>


        <Flex w={'100%'} align={'center'}  >
          <Box w={'60%'} m={5} mt={10} minh={'330px'}
            minw={'330px'} >

            <Pie
              width={100}
              height={100}

              data={data}
              options={options}
              style={{
                minWidth: '400px',
                minHeight: '400px',
              }}

            >
            </Pie>


          </Box>

          <Box w={'40%'} m={5} mt={10}  >

            <Box fontSize='20px' mt={8} pl={3}>
              <Heading fontSize='20px' mt={8} > Loan EMI </Heading>
              <Box> NRP {result}</Box>
            </Box>

            <Box fontSize='20px' mt={8} pl={3}>
              <Heading fontSize='20px' mt={8} > Total Interest Payable </Heading>
              <Box> NRP  {totalInterest} </Box>
            </Box>

            <Box fontSize='20px' mt={8} pl={3}>
              <Heading fontSize='20px' mt={8} >  Total Payment</Heading>
              <Box> NRP {totalPayable}</Box>
            </Box>


          </Box>
        </Flex>


      </SimpleGrid>
    </Box>
  );
};

