import { Table } from "@radix-ui/themes";
import React from "react";
import ReservedComponant from "./reserved";
import { Reserved } from "./reservedData";

const ReservedTable = ({
  reserveds,
  refetch,
}: {
  reserveds?: Reserved[];
  refetch: () => void;
}) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Request status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Reserved price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {reserveds?.map((reserved) => (
          <ReservedComponant key={reserved.id} reserved={reserved} refetch={refetch} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ReservedTable;
