"use client";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ArchivedTable from "./archivedTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";
import PaginationControls from "@/app/components/pagination";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  role_name: string;
  is_active: number;
  deleted_at: Date;
  created_at: string;
  updated_at: string;
  password: string;
}

interface Response {
  data: User[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

const fetchUsers = async (page: number) => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/archived-users?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    }
  );
  return response.data;
};

const ArchivedData = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useQuery<Response, Error>({
    queryKey: ["archivedUsers", page],
    queryFn: () => fetchUsers(page),
  });

  let filterd = data?.data.filter((user) => user.name.includes(search || ""));

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
    <Flex className="w-3/4" direction={"column"} gapY={"4"} py={"2"}>
      <Text size={"8"} className="text-zinc-900 font-semibold">
        Manage archived users
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
      <ArchivedTable Users={filterd} refetch={handleRefetch} />
      <PaginationControls
        setPage={handlePage}
        currentPage={page}
        totalPages={data?.pagination.total_pages!}
      />
    </Flex>
  );
};

export default ArchivedData;
