import React from "react";
import Carousel from "./carousel";
import { Container } from "@radix-ui/themes";
import SalesAdvantige from "./salesInfo";
import Books from "../components/books";
import Subscribe from "./subscribe";

const Home = () => {
  return (
    <Container className="sm:p-2">
      <Carousel products={[]} />
      <SalesAdvantige />
      <Books books={[]} label="Selected for you" />
      <Books books={[]} label="Hot Books" />
      <Subscribe />
    </Container>
  );
};

export default Home;
