import { Flex, IconButton, Table, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { GoTrash } from "react-icons/go";

interface Book {
  id: number;
  image: string;
  category_id: 11;
  title: string;
  author: string;
  available_copies: number;
  price: number;
  booking_price: number;
  is_active: number;
  isbn: number;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  category: {
    id: number;
    name: string;
  };
  quantity: number;
}

const Item = ({
  book,
  handleRemovieItem,
  index,
  addItem,
  removieItem,
}: {
  book: Book;
  handleRemovieItem: (index: number) => void;
  index: number;
  addItem: (index: number) => void;
  removieItem: (index: number) => void;
}) => {
  return (
    <Table.Row align={"center"}>
      <Table.ColumnHeaderCell>
        {" "}
        <Flex gap={"4"} align={"center"}>
          <GoTrash
            size={"30"}
            onClick={() => handleRemovieItem(index)}
            className="cursor-pointer"
          />
          <Image
            src={"https://svu-pr1.somar-kesen.com" + book.image}
            alt="Photo image"
            width={"77"}
            height={"116"}
          />
          <Text size={"3"} className="text-zinc-500">
            {book.title}
          </Text>
        </Flex>
      </Table.ColumnHeaderCell>
      <Table.Cell className="text-center">
        <Text size={"3"} className="text-zinc-900 font-semibold">
          $ {book.price}
        </Text>
      </Table.Cell>
      <Table.Cell className="text-center">
        <Flex gapX={"4"} justify={"center"}>
          <IconButton onClick={() => book.quantity > 1 ? removieItem(index) : null} variant="outline" radius="full">
            <LuMinus width="6" height="6" />
          </IconButton>
          <Text size={"3"} className="text-zinc-900 font-semibold">
            {book.quantity}
          </Text>
          <IconButton onClick={() => addItem(index)} variant="outline" radius="full">
            <LuPlus width="6" height="6" />
          </IconButton>
        </Flex>
      </Table.Cell>
      <Table.Cell className="text-center">
        <Text size={"3"} className="text-zinc-900 font-semibold">
          $ {(book.price * book.quantity).toFixed(2)}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

export default Item;
