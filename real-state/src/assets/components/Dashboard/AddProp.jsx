import React from "react";
import { chakra, Box, Flex, SimpleGrid, Icon, Image } from "@chakra-ui/react";

import { BsFillHouseAddFill } from "react-icons/bs";


export default function AddProp(){
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} >
      <Flex bg="brand.400">
        <Image
          src="/images/uplode.png"
          alt="man looking at a laptop"
          fit="cover"
          w="full"
          h={{ base: 64, md: "full" }}
          // bg="gray.100"
          loading="lazy"
        
        />
      </Flex>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, md: 8, lg: 20 }}
        py={24}
        zIndex={3}
      >
        <chakra.span
          color="brand.600"
          _dark={{ color: "gray.300" }}
          fontSize="lg"
          textTransform="uppercase"
          fontWeight="extrabold"
        >
          Post your property 
        </chakra.span>
        <chakra.h1
          mb={4}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color="brand.600"
          _dark={{ color: "gray.300" }}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          Free 
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color="brand.600"
          _dark={{ color: "gray.400" }}
          letterSpacing="wider"
        >
          Get genuene buyers for your property
        </chakra.p>
        <Box display="inline-flex" rounded="md" shadow="md" >
          <chakra.a
            mt={2}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={5}
            py={3}
            border="solid transparent"
            fontWeight="bold"
            w="full"
            rounded="md"
            bg={'blue.400'}
            color={'white'}
            _hover={{ bg: 'blue.500' }}>

            list your property
            <Icon as={BsFillHouseAddFill} ml={2} />
          </chakra.a>
        </Box>
      </Flex>
    </SimpleGrid>
  );
};

