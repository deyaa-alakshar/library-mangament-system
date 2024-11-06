import {  Flex, Table } from "@radix-ui/themes";
import React from "react";
import StatuesDialog from "./statusDialog";
import DeleteDialog from "./deleteDialog";
import ViewDialog from "./viewDialog";
import EditDialog from "./editDialog";
import { User as UserShape } from "./usersData";


const User = ({ user, refetch }: { user: UserShape, refetch: () => void }) => {
  return (
    <Table.Row>
      <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        <StatuesDialog user={user} refetch={refetch} />
      </Table.Cell>
      <Table.Cell>{user.role_name}</Table.Cell>
      <Table.Cell>
        <Flex direction={"column"} gapY={"2"}>
          <Flex gap={"2"}>
            <ViewDialog user={user} />
            <EditDialog user={user} refetch={refetch} />
            <DeleteDialog user={user} refetch={refetch} />
          </Flex>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default User;
