"use client";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ArchivedTable from "./archivedTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";

export interface Category {
  id: number;
  name: string;
  is_active: number;
}

const fetchCategories = async () => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/archived-categories`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    }
  );
  return response.data;
};

const ArchivedData = () => {
  const { data, isLoading, refetch } = useQuery<{ data: Category[] }, Error>({
    queryKey: ["archivedCategories"],
    queryFn: fetchCategories,
  });

  const [search, setSearch] = useState("");

  const handleRefetch = () => {
    refetch();
  };

  let filterd = data?.data.filter((category) =>
    category.name.includes(search || "")
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex className="w-3/4" direction={"column"} gapY={"4"} py={"2"}>
      <Text size={"8"} className="text-zinc-900 font-semibold">
        Categories
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
      <ArchivedTable categories={filterd} refetch={handleRefetch} />
    </Flex>
  );
};

export default ArchivedData;
