import { Table } from "@radix-ui/themes";
import React from "react";
import UserComponant from "./user";
import { User } from "./usersData";

const UsersTable = ({
  Users,
  refetch,
}: {
  Users?: User[];
  refetch: () => void;
}) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Users?.map((user) => (
          <UserComponant key={user.id} user={user} refetch={refetch} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UsersTable;
