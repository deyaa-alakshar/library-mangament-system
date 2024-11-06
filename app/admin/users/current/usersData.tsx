"use client";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import UsersTable from "./usersTable";
import AddDialog from "./addDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";

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

const fetchCategories = async (page: string) => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/users?page=${page}`,
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
  const [page, setPage] = useState("1");

  const { data, isLoading, refetch } = useQuery<{ data: User[] }, Error>({
    queryKey: ["users", page],
    queryFn: () => fetchCategories(page),
  });

  let filterd = data?.data.filter((user) => user.name.includes(search || ""));

  const handleRefetch = () => {
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex className="w-3/4" direction={"column"} gapY={"4"} py={"2"}>
      <Text size={"8"} className="text-zinc-900 font-semibold">
        Manage current users
      </Text>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Box className="flex-grow">
          <TextField.Root
            id="search"
            placeholder="Search"
            type="text"
            variant={"soft"}
            size={"3"}
            className="w-3/4"
            onChange={(e) => setSearch(e.target.value)}
          >
            <TextField.Slot>
              <FaSearch height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <AddDialog refetch={handleRefetch} />
      </div>
      <UsersTable Users={filterd} refetch={handleRefetch} />
    </Flex>
  );
};

export default UsersData;
