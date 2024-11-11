import { Table } from "@radix-ui/themes";
import React from "react";
import BookComponant from "./book";
import { Book } from "./booksData";


const BooksTable = ({
  books,
  refetch,
}: {
  books?: Book[];
  refetch: () => void;
}) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Reserved price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {books?.map((book) => (
          <BookComponant key={book.id} book={book} refetch={refetch} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default BooksTable;
