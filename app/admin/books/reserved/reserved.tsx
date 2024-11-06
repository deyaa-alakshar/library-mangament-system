import { Badge, Flex, Table } from "@radix-ui/themes";
import React from "react";
import DeleteDialog from "./deleteDialog";
import ViewDialog from "./viewDialog";
import { Reserved as ReservedShape } from "./reservedData";
import AcceptDialog from "./acceptDialog";
import StatusDialog from "./statusDialog";

const Reserved = ({
  reserved,
  refetch,
}: {
  reserved: ReservedShape;
  refetch: () => void;
}) => {
  return (
    <Table.Row>
      <Table.RowHeaderCell>{reserved.id} #</Table.RowHeaderCell>
      <Table.Cell>{reserved.book.title}</Table.Cell>
      <Table.Cell>{reserved.book.author}</Table.Cell>
      <Table.Cell>
        <AcceptDialog reserved={reserved} refetch={refetch} />
      </Table.Cell>
      <Table.Cell>
        <StatusDialog reserved={reserved} refetch={refetch} />
      </Table.Cell>
      <Table.Cell>{reserved.book.price}</Table.Cell>
      <Table.Cell>{reserved.book.booking_price}</Table.Cell>
      <Table.Cell>
        <Flex direction={"column"} gapY={"2"}>
          <Flex gap={"2"}>
            <ViewDialog reserved={reserved} />
            <DeleteDialog reserved={reserved} refetch={refetch} />
          </Flex>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default Reserved;
