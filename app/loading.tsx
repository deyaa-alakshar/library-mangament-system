"use client";
import { Flex } from "@radix-ui/themes";
import React from "react";
import { Triangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <Flex className="h-svh" justify={'center'} align={"center"}>
      <Triangle
        height="200" // Height of the spinner
        width="200" // Width of the spinner
        color="#937DC2" // Color of the spinner
        ariaLabel="triangle-loading"
        visible={true} // Boolean to control visibility
      />
    </Flex>
  );
};

export default Loading;
