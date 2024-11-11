"use client";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BooksTable from "./booksTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";
import PaginationControls from "@/app/components/pagination";

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

interface Response {
  data: Book[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

const fetchBooks = async (page: number) => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/archived-books?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    }
  );
  return response.data;
};

const UsersData = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useQuery<Response, Error>({
    queryKey: ["archivedBooks", page],
    queryFn: () => fetchBooks(page),
  });

  const pages = Array.from(
    { length: data?.pagination.total_pages! },
    (_, index) => index + 1
  );
  {
  }

  let filterd = data?.data.filter((book) => book.title.includes(search || ""));

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex className="w-10/12" direction={"column"} gapY={"4"} py={"2"}>
      <Text size={"8"} className="text-zinc-900 font-semibold">
        Manage archived books
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

      <PaginationControls
        setPage={handlePage}
        currentPage={page}
        totalPages={data?.pagination.total_pages!}
      />
    </Flex>
  );
};

export default UsersData;
