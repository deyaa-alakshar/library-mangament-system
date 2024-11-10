"use client";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import React, { useCallback, useState } from "react";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { Book } from "./productDetails";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import BorrowDialog from "./borrowDialog";
import { toast } from "react-toastify";

interface CartItem extends Book {
  quantity: number;
}

const ProductInfo = ({ book }: { book: Book }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = useCallback(() => {
    // Get the existing cart from cookies or initialize an empty array
    const cart = Cookies.get("cart")
      ? (JSON.parse(Cookies.get("cart") as string) as CartItem[])
      : [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === book.id
    );

    if (existingItemIndex > -1) {
      // If the item exists, update the quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      const item = { ...book, quantity: quantity };
      cart.push(item);
    }

    // Save the updated cart back to the cookies
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 }); // Expires in 7 days

    toast.success("Added to cart successfully", {
      position: "bottom-left",
    });
  }, [quantity]);

  return (
    <Flex direction={"column"} justify={"center"} gap={"2"} my={"4"}>
      <Text size={"4"} className="text-zinc-900 font-semibold">
        {" "}
        {book.title}
      </Text>
      <Text size={"3"} className="text-zinc-900 font-semibold">
        {" "}
        {book.author}
      </Text>
      <Text size={"2"} className="text-zinc-500 font-medium">
        {book.category.name}
      </Text>
      <Text size={"3"} className="text-zinc-900 font-semibold">
        $ {book.price * quantity}
      </Text>
      <Flex gapX={"4"}>
        <IconButton
          type="button"
          onClick={() => (quantity > 0 ? setQuantity(quantity - 1) : null)}
          variant="outline"
          radius="full"
        >
          <LuMinus width="18" height="18" />
        </IconButton>
        <Text size={"3"} className="text-zinc-900 font-semibold">
          {quantity}
        </Text>
        <IconButton
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          variant="outline"
          radius="full"
        >
          <LuPlus width="18" height="18" />
        </IconButton>
      </Flex>
      <Flex gapX={"4"} justify={"between"}>
        <Button
          type="button"
          style={{ flexGrow: "1" }}
          size={"4"}
          variant={"solid"}
          className="cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
        <BorrowDialog book={book} />
      </Flex>
    </Flex>
  );
};

export default ProductInfo;
