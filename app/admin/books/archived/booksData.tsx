"use client";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BooksTable, { Book } from "./booksTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";

const fetchBooks = async () => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/archived-books`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    }
  );
  return response.data;
};

const UsersData = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useQuery<{ data: Book[] }, Error>({
    queryKey: ["archivedBooks"],
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
        Manage books
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
      </div>
      <BooksTable books={filterd} refetch={handleRefetch} />
    </Flex>
  );
};

export default UsersData;
