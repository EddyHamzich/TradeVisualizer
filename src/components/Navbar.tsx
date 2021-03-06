import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

export const Navbar = (): JSX.Element => {
  return (
    <Flex
      className="navbar"
      bg="#1A1A2E"
      h="10vh"
      color="white"
      justifyContent="center"
      alignItems="center"
    >
      <Heading
        fontWeight="light"
        onClick={() => window.location.reload()}
        cursor="pointer"
      >
        Trade Visualizer
      </Heading>
    </Flex>
  )
}