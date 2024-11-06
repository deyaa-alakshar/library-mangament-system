import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import DeleteDialog from "./deleteDialog";
import RestoreDialog from "./restoreDialog";
import { Category } from "./archivedData";

const ArchivedTable = ({
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

          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {categories?.map((category) => (
          <Table.Row key={category.id}>
            <Table.RowHeaderCell>{category.name}</Table.RowHeaderCell>
            <Table.RowHeaderCell>
              <Flex gapX={"3"}>
                <RestoreDialog category={category} refetch={refetch} />
                <DeleteDialog category={category} refetch={refetch} />
              </Flex>
            </Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ArchivedTable;
