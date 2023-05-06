import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// const ForgotPasswordFormInputs = {
//   email: string
// };

export default function ForgotPassForm() {

  const [inputs, setInputs] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const response = fetch("http://localhost:4000/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/jason",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          inputs
        }),
      })
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      as={'form'}
      onSubmit={handleSubmit}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get a code on your number.
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your phone number "
            _placeholder={{ color: 'gray.500' }}
            type="number"
            onChange={(e) => setInputs(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            type="submit"
            _hover={{
              bg: 'blue.500',
            }}>
            Request Reset
          </Button>
          <Link to="/verify"><Text color={'blue.400'}> Verify </Text></Link>
        </Stack>
      </Stack>
    </Flex>
  );
}