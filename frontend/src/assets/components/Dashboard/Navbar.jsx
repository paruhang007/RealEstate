import {
  Box,
  Flex,
  Heading,
  Link,
  Button,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  chakra,
  IconButton,
  VisuallyHidden,
  HStack,
  VStack,
  CloseButton,
  Image,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { Outlet, NavLink, useLocation } from "react-router-dom";
import Footer from "./Footer";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export default function NavBar() {
  const token = localStorage.getItem("token");
  const bg = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  const mobileNav = useDisclosure();

  const [userData, setUserData] = useState({});

  // // getting the token from local storage
  // const data = localStorage.getItem('token');
  // // decoding the token which is actually holding the user id  
  // const user = jwt_decode(data);

  // const loadData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/userGet", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         "id": user.id,

  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data.data);
  //     setUserData(data.data);
  //   }

  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <Image src="/images/LOGO-sm.png" alt="logo" />
            <chakra.a
              href="/"
              title=" Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>GharJagga</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              GharJagga.com
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <NavLink to="/">
                <Button variant="ghost">Home</Button>
              </NavLink>

              <NavLink to="/search">
                <Button variant="ghost">Property</Button>
              </NavLink>

              <NavLink to="/service">
                <Button variant="ghost">Services</Button>
              </NavLink>

              <NavLink to="/unitconvert">
                <Button variant="ghost">Unit Calculator</Button>
              </NavLink>
              <NavLink to="/emical">
                <Button variant="ghost">EMI Calculator</Button>
              </NavLink>
              <Menu>
                {token && <Avatar
                  as={MenuButton}
                  size={"sm"}
                // src={userData.userImg} 
                />}
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/addproperty");
                    }}
                  >
                    Add Property
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/myproperties");
                    }}
                  >My Property</MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/favourite");
                    }}
                  >Favourite</MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate("/changepass");
                    }}
                  >
                    Change Password
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>

              {!token && <Button variant="ghost">Sign up</Button>}
            </HStack>
            {!token && (
              <Button
                colorScheme="purple"
                size="sm"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </Button>
            )}
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Home
                </Button>
                <Button w="full" variant="ghost">
                  Property
                </Button>
                <Button w="full" variant="ghost">
                  Unit Calculator
                </Button>
                <Button w="full" variant="ghost">
                  EMI Calculator
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}
