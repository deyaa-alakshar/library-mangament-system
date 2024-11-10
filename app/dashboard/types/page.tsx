import { Container, Flex, Grid } from "@radix-ui/themes";
import React, { cache } from "react";
import TypesOfBooks from "./typesOfBooks";

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

const Types = async () => {
  const books = await fetchBooks();
  const pages = Array.from(
    { length: books.data.pagination.total_pages },
    (_, index) => index + 1
  );
  {
  }

  return (
    <Container>
      <Flex justify={"between"} gapY={"6"} gapX={"6"} my={"4"}>
        <TypesOfBooks />
        <Flex direction={"column"} gap={"2"}> </Flex>
      </Flex>
    </Container>
  );
};

export default Types;
