import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import DeleteDialog from "./deleteDialog";
import ViewDialog from "./viewDialog";
import Image from "next/image";
import RestoreDialog from "./restoreDialog";
import { Book } from "./booksTable";


const User = ({ book, refetch }: { book: Book; refetch: () => void }) => {
  return (
    <Table.Row align={"center"}>
      <Table.RowHeaderCell>
        <Flex align={"center"} gapX={"3"}>
          <Image
            src={"https://svu-pr1.somar-kesen.com" + book.image}
            width={"50"}
            height={"50"}
            alt="Book cover"
          />
          {book.title}
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>{book.author}</Table.Cell>
      <Table.Cell>{book.category.name}</Table.Cell>

      <Table.Cell>{book.price}</Table.Cell>
      <Table.Cell>{book.booking_price}</Table.Cell>
      <Table.Cell>
        <Flex direction={"column"} gapY={"2"}>
          <Flex gap={"2"}>
            <ViewDialog book={book} />
            <RestoreDialog book={book} refetch={refetch}  />
            <DeleteDialog book={book} refetch={refetch} />
          </Flex>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};

export default User;
