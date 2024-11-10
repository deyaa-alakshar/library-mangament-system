"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Flex,
  Table,
  Text,
  IconButton,
  Button,
} from "@radix-ui/themes";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import ss from "../../public/VISA-card-logo- 1.png";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import Cookies from "js-cookie";
import Item from "./item";
import { useRouter } from "next/navigation";
import CheckoutDialog from "./checkoutDialog";


export interface Book {
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

const Cart = () => {
  const [basket, setBasket] = useState<Book[] | []>([]);
  const router = useRouter();

  useEffect(() => {
    const basket = Cookies.get("cart")
      ? (JSON.parse(Cookies.get("cart")!) as Book[])
      : [];

    setBasket(basket);
  }, []);

  const handleRemovieItem = useCallback(
    (index: number) => {
      setBasket(basket.filter((item, indexNum) => index !== indexNum));
      Cookies.set(
        "cart",
        JSON.stringify(basket.filter((item, indexNum) => index !== indexNum))
      );
    },
    [basket]
  );

  const addItem = useCallback(
    (index: number) => {
      const elementIndex = basket.findIndex(
        (item, itemNum) => itemNum === index
      );
      const updatedBasket = [...basket];
      updatedBasket[elementIndex] = {
        ...updatedBasket[elementIndex],
        quantity: updatedBasket[elementIndex].quantity + 1,
      };
      setBasket(updatedBasket);
    },
    [basket]
  );

  const removieItem = useCallback(
    (index: number) => {
      const elementIndex = basket.findIndex(
        (item, itemNum) => itemNum === index
      );
      const updatedBasket = [...basket];
      updatedBasket[elementIndex] = {
        ...updatedBasket[elementIndex],
        quantity: updatedBasket[elementIndex].quantity - 1,
      };
      setBasket(updatedBasket);
    },
    [basket]
  );

  return (
    <Container>
      <div className="my-8 w-4/3">
        <Text
          size={"6"}
          className="text-zinc-900 font-semibold text-center block"
        >
          Cart
        </Text>
        <Table.Root>
          <Table.Header className="font-semibold">
            <Table.Row>
              <Table.ColumnHeaderCell>Products</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">
                Price
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">
                Quantity
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">
                Subtotal
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {basket.map((book, index) => (
              <Item
                key={book.id}
                book={book}
                handleRemovieItem={handleRemovieItem}
                index={index}
                addItem={addItem}
                removieItem={removieItem}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <div className="mx-auto w-1/2 mb-8">
        <Flex
          direction={"column"}
          gap={"3"}
          p={"8"}
          className="border border-solid border-#9B9B9B rounded-lg"
        >
          <Text size={"8"} className="text-zinc-900 font-semibold">
            Cart Total{" "}
          </Text>
          <Flex className="border-y border-solid border-#9B9B9B p-4" gapX={"4"}>
            <Text size={"4"} className="text-zinc-500 ">
              Total :
            </Text>
            <Text size={"4"} className="text-zinc-500 ">
              ${" "}
              {basket
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </Text>
          </Flex>
          <Flex className="border-y border-solid border-#9B9B9B p-4" gapX={"4"}>
            <Text size={"4"} className="text-zinc-500 ">
              Items :
            </Text>
            <Text size={"4"} className="text-zinc-500 ">
              {basket.length}
            </Text>
          </Flex>
          <CheckoutDialog basket={basket} />
        </Flex>
      </div>
    </Container>
  );
};

export default Cart;
