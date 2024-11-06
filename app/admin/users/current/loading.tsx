import { Box, Flex, Skeleton, Table, Text } from "@radix-ui/themes";
import React from "react";

const Loading = () => {
  return (
    <Flex className="w-3/4" direction={"column"} gapY={"4"} py={"2"}>
      <Text size={"8"} className="text-zinc-900 font-semibold">
        Manage users
      </Text>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Box className="flex-grow">
          <Skeleton width={"615px"} height={"40px"}></Skeleton>
        </Box>
        <Skeleton width={"99px"} height={"40px"}></Skeleton>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.RowHeaderCell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Skeleton width={"200px"} height={"40px"}></Skeleton>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default Loading;
