"use client";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BooksTable from "./booksTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export interface Book {
  id: number;
  image: string;
  category_id: 11;
  title: string;
  author: string;
  available_copies: number;
  price: number;
  booking_price: number;
  is_active: number;
  isbn: number;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  category: {
    id: number;
    name: string;
    is_active: number;
    deleted_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
  };
}

export interface Category {
  id: number;
  name: string;
  is_active: number;
}


const fetchBooks = async () => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/books`, {
    headers: {
      Authorization: `Bearer ${userInfo.access_token}`,
    },
  });
  return response.data;
};

const UsersData = ({categories}: {categories: Category[]}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery<{ data: Book[] }, Error>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  let filterd = data?.data.filter((book) => book.title.includes(search || ""));

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex className="w-10/12" direction={"column"} gapY={"4"} py={"2"}>
      <Text size={"8"} className="text-zinc-900 font-semibold">
        Manage current books
      </Text>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Box className="flex-grow">
          <TextField.Root
            id="search"
            placeholder="Search"
            type="text"
            variant={"soft"}
            size={"3"}
            className="w-1/2"
            onChange={(e) => setSearch(e.target.value)}
          >
            <TextField.Slot>
              <FaSearch height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Button
          onClick={() => router.push("/admin/books/add")}
          type="button"
          size={"3"}
        >
          Add book
        </Button>
      </div>
      <BooksTable books={filterd} refetch={handleRefetch} categories={categories} />
    </Flex>
  );
};

export default UsersData;
