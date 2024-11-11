"use client";
import { Box, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import CategoriesTable from "./categoriesTable";
import AddDialog from "./addDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./loading";
import PaginationControls from "@/app/components/pagination";

export interface Category {
  id: number;
  name: string;
  is_active: number;
}

interface Response {
  data: Category[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_pages: number;
  };
}

const fetchCategories = async (page: number) => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/categories?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    }
  );
  return response.data;
};

const CategoriesData = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useQuery<Response, Error>({
    queryKey: ["categories", page],
    queryFn: () => fetchCategories(page),
  });

  const handleRefetch = () => {
    refetch();
  };

  const handlePage = (page: number) => {
    setPage(page);
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
            className="w-3/4"
            onChange={(e) => setSearch(e.target.value)}
          >
            <TextField.Slot>
              <FaSearch height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <AddDialog />
      </div>
      <CategoriesTable categories={filterd} refetch={handleRefetch} />
      <PaginationControls
        setPage={handlePage}
        currentPage={page}
        totalPages={data?.pagination.total_pages!}
      />
    </Flex>
  );
};

export default CategoriesData;
