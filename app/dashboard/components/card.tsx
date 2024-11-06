import React from "react";
import ss from "../../public/login cover.png";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

const Card = () => {
  return (
    <Flex direction={"column"} gap={"2"}>
      <Image src={ss} alt="Book cover" width={"274"} height={"414"} />
      <Text size={"4"} className="text-zinc-900 font-medium">
        Financial Feminist
      </Text>
      <Text size={"2"} className="text-zinc-500 font-medium">
        Tori Dunlap
      </Text>
      <Flex justify={"between"}>
        <Text size={"3"} className="text-zinc-900 font-medium">
          $20.46
        </Text>
        <FaRegHeart color="#937DC2" size={"25"} />
      </Flex>
      <Button variant="solid" size={"3"}>
        <SlBasket color="#fff" /> Add to card
      </Button>
    </Flex>
  );
};

export default Card;
