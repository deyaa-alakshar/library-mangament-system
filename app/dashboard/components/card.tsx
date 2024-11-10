"use client";
import React, { useState } from "react";
import backupImage from "../../public/login cover.png";
import { SlBasket } from "react-icons/sl";
import { Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Favorite from "./favorite";
import { Book } from "./books";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface CartItem extends Book {
  quantity: number;
}

const Card = ({
  book,
  favorites,
  handleAddToFavorite,
  handleRemoveToFavorite,
}: {
  book: Book;
  favorites: Book[];
  handleRemoveToFavorite: (book: Book) => void;
  handleAddToFavorite: (book: Book) => void;
}) => {
  const [src, setSrc] = useState<any>(
    "https://svu-pr1.somar-kesen.com" + book.image
  );

  const router = useRouter();

  const addToCart = () => {
    const cart = Cookies.get("cart")
      ? (JSON.parse(Cookies.get("cart") as string) as CartItem[])
      : [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === book.id
    );

    if (existingItemIndex > -1) {
      // If the item exists, update the quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // If the item doesn't exist, add it to the cart
      const item = { ...book, quantity: 1 };
      cart.push(item);
    }

    // Save the updated cart back to the cookies
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 }); // Expires in 7 days

    toast.success("Added to cart successfully", {
      position: "bottom-left",
    });

    router.refresh();
  };
  return (
    <Flex
      direction={"column"}
      gap={"2"}
      className="mb-10"
      height={"500px"}
      maxHeight={"500px"}
    >
      <Image
        onError={() => setSrc(backupImage)}
        src={src}
        alt="Book cover"
        width={"274"}
        height={"414"}
        className="object-cover rounded-md"
      />
      <Text size={"3"} className="text-zinc-900 font-medium">
        {book.title.length > 20 ? book.title.slice(0, 20) + "..." : book.title}
      </Text>
      <Text size={"2"} className="text-zinc-500 font-medium">
        {book.author.length > 20
          ? book.author.slice(0, 20) + "..."
          : book.author}
      </Text>
      <Flex justify={"between"}>
        <Text size={"3"} className="text-zinc-900 font-medium">
          {"$ " + book.price}
        </Text>
        <Favorite
          book={book}
          favorites={favorites}
          handleRemoveToFavorite={handleRemoveToFavorite}
          handleAddToFavorite={handleAddToFavorite}
        />
      </Flex>
      <Button onClick={addToCart} variant="solid" size={"3"}>
        <SlBasket color="#fff" /> Add to card
      </Button>
    </Flex>
  );
};

export default Card;
