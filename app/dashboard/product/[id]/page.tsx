import { Container, Flex } from "@radix-ui/themes";
import React, { cache } from "react";
import ProductDetails from "./productDetails";
import Books from "../../components/books";
import axios from "axios";
import { cookies } from "next/headers";

const fetchBooks = cache(
  async (token: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/active-books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
);

const fetchBook = cache(
  async (id: string, token: string) =>
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
);

const Product = async ({ params }: { params: { id: string } }) => {
  const cookie = cookies();
  const userInfo = JSON.parse(cookie.get("userInfo")?.value!);

  const books = await fetchBooks(userInfo.access_token);
  const book = await fetchBook(params.id, userInfo.access_token);
  const pages = Array.from(
    { length: books.data.pagination.total_pages },
    (_, index) => index + 1
  );
  {
  }
  return (
    <Container>
      <ProductDetails book={book.data.data} />

      <Flex direction={"column"} gapY={"6"} my={"4"}>
        {pages.map((page) => (
          <Books key={page} page={page} />
        ))}
      </Flex>
    </Container>
  );
};

export default Product;
