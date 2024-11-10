import React, { cache } from "react";
import Carousel from "./carousel";
import { Container, Flex } from "@radix-ui/themes";
import SalesAdvantige from "./salesInfo";
import Books from "../components/books";
import Subscribe from "./subscribe";
import { cookies } from "next/headers";
import axios from "axios";

const cookie = cookies();
const userInfo = JSON.parse(cookie.get("userInfo")?.value!);

const fetchBooks = cache(
  async () =>
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/active-books`, {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    })
);

const Home = async () => {
  const books = await fetchBooks();
  const pages = Array.from(
    { length: books.data.pagination.total_pages },
    (_, index) => index + 1
  );
  {
  }
  return (
    <Container className="sm:p-2">
      <Carousel books={books.data} />
      <SalesAdvantige />

      <Flex direction={"column"} gapY={"6"}>
        {pages.map((page) => (
          <Books key={page} page={page} />
        ))}
      </Flex>

      <Subscribe />
    </Container>
  );
};

export default Home;
