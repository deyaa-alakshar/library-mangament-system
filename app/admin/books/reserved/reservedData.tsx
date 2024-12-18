"use client";
import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ReservedTable from "./reservedTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";
import PaginationControls from "@/app/components/pagination";

export interface Reserved {
  id: number;
  user_id: number;
  book_id: number;
  request_status: string;
  borrowed_at: string;
  due_date: string;
  returned_at: null;
  status: string;
  deleted_at: Date | null;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    role_name: string;
    is_active: number;
    deleted_at: Date | null;
    created_at: string;
    updated_at: string;
  };
  book: {
    id: 31;
    image: string;
    category_id: number;
    title: string;
    author: string;
    available_copies: number;
    price: string;
    booking_price: string;
    is_active: number;
    isbn: string;
    deleted_at: Date | null;
    created_at: string;
    updated_at: string;
  };
}

interface Response {
  data: Reserved[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

const reservedBooks = async (page: number) => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/bookings?page=${page}`, {
    headers: {
      Authorization: `Bearer ${userInfo.access_token}`,
    },
  });
  return response.data;
};

const ReservedData = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useQuery<Response, Error>({
    queryKey: ["reservedBooks", page],
    queryFn: () => reservedBooks(page),
  });

  let filterd = data?.data.filter(
    (reserved) =>
      reserved.user.name.includes(search || "") ||
      reserved.book.title.includes(search || "")
  );

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
        Manage reserved books
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
      <ReservedTable reserveds={filterd} refetch={handleRefetch} />

      <PaginationControls
        setPage={handlePage}
        currentPage={page}
        totalPages={data?.pagination.total_pages!}
      />
    </Flex>
  );
};

export default ReservedData;
