"use client";
import React from "react";
import { CheckboxGroup, Flex, Text } from "@radix-ui/themes";

const types = [
  "Horror",
  "Adventures",
  "Action",
  "Magic",
  "Fantasy",
  "Science",
  "Space",
  "Kids",
];

const price = ["Under 10$", "10 - 20 $", "10 - 20 $", "10 - 20 $"];

const TypesOfBooks = () => {
  return (
    <Flex direction={"column"} gapY={"2"}>
      <Text size={"4"} className="text-zinc-900 font-medium">
        Categories
      </Text>
      <CheckboxGroup.Root defaultValue={["1"]} name="types">
        {types.map((type) => (
          <CheckboxGroup.Item value={type}>
            <Text size={"3"} className="text-zinc-900 font-medium">
              {type}
            </Text>
          </CheckboxGroup.Item>
        ))}
      </CheckboxGroup.Root>
      <Text size={"4"} className="text-zinc-900 font-medium">
        Price
      </Text>
      <CheckboxGroup.Root defaultValue={["1"]} name="types">
        {price.map((type) => (
          <CheckboxGroup.Item value={type}>
            <Text size={"3"} className="text-zinc-900 font-medium">
              {type}
            </Text>
          </CheckboxGroup.Item>
        ))}
      </CheckboxGroup.Root>
    </Flex>
  );
};

export default TypesOfBooks;
