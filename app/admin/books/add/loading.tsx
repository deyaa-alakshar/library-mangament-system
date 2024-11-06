import { Box, Flex, Grid, Skeleton, Text } from "@radix-ui/themes";
import React from "react";

const Loading = () => {
  return (
    <Box className="md:w-1/2 p-2">
      <Flex direction={"column"} gapY={"4"} py={"2"}>
        {" "}
        <Text size={"8"} className="text-zinc-900 font-semibold">
          Add a book
        </Text>
        <Grid columns={{ initial: "1", md: "2" }} gapY={"4"} gapX={"4"}>
          <Box>
            <Skeleton width={"150px"} height={"30px"}></Skeleton>
          </Box>
          <Box>
            <Skeleton width={"150px"} height={"30px"}></Skeleton>
          </Box>
          <Box>
            <Skeleton width={"150px"} height={"30px"}></Skeleton>
          </Box>
          <Box>
            <Skeleton width={"150px"} height={"30px"}></Skeleton>
          </Box>
          <Box>
            <Skeleton width={"150px"} height={"30px"}></Skeleton>
          </Box>
        </Grid>
        <Skeleton width={"300px"} height={"100px"}></Skeleton>
        <Grid columns={{ initial: "1", md: "2" }} gapY={"4"} gapX={"4"}>
          {" "}
          <Box>
            <Skeleton width={"150px"} height={"30px"}></Skeleton>
          </Box>
          
          <Skeleton width={"150px"} height={"30px"}></Skeleton>
          <Skeleton width={"75px"} height={"30px"}></Skeleton>
          <Skeleton width={"100px"} height={"30px"}></Skeleton>
        </Grid>
      </Flex>
    </Box>
  );
};

export default Loading;
