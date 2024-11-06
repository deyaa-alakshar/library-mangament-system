import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import DeleteDialog from "./deleteDialog";
import ViewDialog from "./viewDialog";
import RestoreDialog from "./restoreDialog";
import { User as UserShape } from "./archivedData";


const User = ({ user, refetch }: { user: UserShape; refetch: () => void }) => {
  return (
    <Table.Row>
      <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
      <Table.Cell>{user.email}</Table.Cell>

      <Table.Cell>{user.role_name}</Table.Cell>
      <Table.Cell>
        <Flex direction={"column"} gapY={"2"}>
          <Flex gap={"2"}>
            <RestoreDialog user={user} refetch={refetch} />
            <ViewDialog user={user} />
            <DeleteDialog user={user} refetch={refetch} />
          </Flex>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default User;
