"use client";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

const ProductInfo = () => {
  return (
    <Flex direction={"column"} gap={"4"} my={"4"}>
      <Text size={"4"} className="text-zinc-900 font-semibold">
        {" "}
        Chain of Gold: The Last Hours #1
      </Text>
      <Text size={"2"} className="text-zinc-900 font-semibold">
        {" "}
        Cassandra Clare
      </Text>
      <Rating readonly initialValue={2.4} className="inline" />
      <Text size={"3"} className="text-zinc-900 font-semibold">
        $12.49
      </Text>
      <Text size={"2"} className="text-zinc-500 font-medium">
        From #1 New York Times and USA TODAY bestselling author Cassandra Clare
        comes the first novel in a brand-new trilogy where evil hides in plain
        sight and love cuts deeper than any blade. Chain of Gold is a
        Shadowhunters novel.
      </Text>
      <Flex gapX={"4"}>
        <IconButton variant="outline" radius="full">
          <LuMinus width="18" height="18" />
        </IconButton>
        <Text size={"3"} className="text-zinc-900 font-semibold">
          $12.49
        </Text>
        <IconButton variant="outline" radius="full">
          <LuPlus width="18" height="18" />
        </IconButton>
      </Flex>
      <Flex gapX={"4"} justify={"between"}>
        <Button style={{ flexGrow: "1" }} size={"4"} variant={"solid"}>
          Add to cart
        </Button>
        <Button style={{ flexGrow: "1" }} size={"4"} variant={"outline"}>
          Borrow
        </Button>
      </Flex>
      <div className="border-b-2 border-#937DC299 border-solid my-4"></div>
      <Flex direction={"column"} gapY={"4"}>
        <Flex justify={"between"}>
          <Flex gapX={"2"}>
            <Text color="purple">Publisher :</Text>
            <Text mx={"2"}>Margaret K. Books</Text>
          </Flex>
          <Flex gapX={"2"}>
            <Text color="purple">Publication date :</Text>
            <Text mx={"2"}>March 3, 2020</Text>
          </Flex>
        </Flex>
        <Flex justify={"between"}>
          <Flex gapX={"2"}>
            <Text color="purple">Language :</Text>
            <Text mx={"2"}>English</Text>
          </Flex>
          <Flex gapX={"2"}>
            <Text color="purple">Reading age :</Text>
            <Text mx={"2"}>March 3, 2020</Text>
          </Flex>
        </Flex>
        <Flex justify={"between"}>
          <Flex gapX={"2"}>
            <Text color="purple">Print length :</Text>
            <Text mx={"2"}>592 pages</Text>
          </Flex>
          <Flex gapX={"2"}>
            <Text color="purple">Dimensions :</Text>
            <Text mx={"2"}>6 x 1.8 x 9 inches</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductInfo;
