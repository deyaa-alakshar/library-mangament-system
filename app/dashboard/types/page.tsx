import { Container, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import TypesOfBooks from "./typesOfBooks";
import Books from "../components/books";

const Types = () => {
  return (
    <Container>
      <Flex justify={"between"} gapY={"6"} gapX={"6"} my={"4"}>
        <TypesOfBooks />
        <Flex direction={"column"} gap={"2"}>
          <Books books={[]} label="Most common" />
          <Books books={[]} label="Top Rated" />
        </Flex>
      </Flex>
      <Books books={[]} label="Most popular" />
      <Books books={[]} label="Hottest" />
    </Container>
  );
};

export default Types;
