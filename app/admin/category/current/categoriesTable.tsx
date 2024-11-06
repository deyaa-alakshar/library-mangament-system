import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import EditDialog from "./editDialog";
import StatuesDialog from "./statuesDialog";
import DeleteDialog from "./deleteDialog";
import { Category } from "./categoriesData";

const CategoriesTable = ({
  categories,
  refetch,
}: {
  categories?: Category[];
  refetch: () => void;
}) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {categories?.map((category) => (
          <Table.Row>
            <Table.RowHeaderCell>{category.name}</Table.RowHeaderCell>
            <Table.Cell>
              <StatuesDialog category={category} refetch={refetch} />
            </Table.Cell>
            <Table.RowHeaderCell>
              <Flex gapX={"3"}>
                <EditDialog category={category} refetch={refetch} />
                <DeleteDialog category={category} refetch={refetch} />
              </Flex>
            </Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default CategoriesTable;
