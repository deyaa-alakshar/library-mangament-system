import { Button, Container, Flex, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import wallet from "../../public/Received cashback in digital wallet.png";

const BookLink = () => {
  return (
    <Container>
      <Flex direction={"column"} gapY={"4"} align={"center"} my={"4"}>
        <Image src={wallet} alt="Wallet image" width={"501"} height={"512"} />
        <Text size={"6"} className="font-semibold">
          Here’s the book’s link :
        </Text>
        <Text
          size={"4"}
          className="font-semibold text-zinc-500 border-b-2 border-#ABB0BA border-solid pb-2"
        >
          https://b-world.com/book/2167324/download/
        </Text>
        <Button size={"3"}>Back to cart</Button>
      </Flex>
    </Container>
  );
};

export default BookLink;
