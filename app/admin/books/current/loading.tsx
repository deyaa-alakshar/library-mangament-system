import { Box, Flex, Skeleton, Table, Text } from "@radix-ui/themes";
import React from "react";

const Loading = () => {
  return (
    <Flex className="w-10/12" direction={"column"} gapY={"4"} py={"2"}>
      <Text size={"8"} className="text-zinc-900 font-semibold">
        Manage current books
      </Text>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Box className="flex-grow">
          <Skeleton width={"529px"} height={"40px"}></Skeleton>
        </Box>
        <Skeleton width={"105px"} height={"40px"}></Skeleton>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reserved price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"30px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"30px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"30px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"30px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"30px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"30px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"100px"} height={"30px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default Loading;
