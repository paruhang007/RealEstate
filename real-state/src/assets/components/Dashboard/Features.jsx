import React from "react";
import { chakra, Box, SimpleGrid, Flex, Icon, Center } from "@chakra-ui/react";
import {GiHouse } from 'react-icons/gi';
import {MdOutlineSell } from 'react-icons/md';
import {GiHouseKeys } from 'react-icons/gi';

export default function Feat(){
  const Feature = (props) => {
    return (
      <Box>
        <Icon
          boxSize={24}
          _light={{ color: "brand.700" }}
          mb={4}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          
        >
          {props.icon}
        </Icon>
        <chakra.h3
          mb={3}
          fontSize="lg"
          lineHeight="shorter"
          fontWeight="bold"
          _light={{ color: "gray.900" }}
        >
          {props.title}
        </chakra.h3>
        <chakra.p
          lineHeight="tall"
          color="gray.600"
          _dark={{ color: "gray.400" }}
        >
          {props.children}
        </chakra.p>
      </Box>
    );
  };

  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={20}
        px={{ base: 4, lg: 16, xl: 24 }}
        py={20}
        mx="auto"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="xl"
      >
        <Feature
          title="Buy Property"
            icon={
          <Icon as={GiHouse}  />
          }
        >
          Find amazing property to buy from our wide range of properties.  
        </Feature>

        <Feature
          title="Sell Property"
          icon={
           < Icon as={MdOutlineSell} />
            
          }
        >
          List out your property for sale and get the best price for it.
        </Feature>

        <Feature
          title="Rent Property"
          icon={
            <Icon as={GiHouseKeys} />
            // <path
            //   strokeLinecap="round"
            //   strokeLinejoin="round"
            //   strokeWidth="2"
            //   d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
            // />
          }
        >
          Rent out your property and get the best price for it.
          Or you cna find different kinds of property to rent.
        </Feature>
      </SimpleGrid>
    </Flex>
  );
};
