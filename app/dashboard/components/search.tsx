"use client";
import { TextField } from "@radix-ui/themes";
import React from "react";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <TextField.Root
      size={"2"}
      placeholder="Type any book here"
      onChange={() => console.log()}
      variant="soft"
    >
      <TextField.Slot side="right">
        <IoMdSearch size="25" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default Search;
