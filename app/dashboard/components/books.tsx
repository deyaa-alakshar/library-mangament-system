import React from "react";
import { Grid, Text } from "@radix-ui/themes";
import Card from "./card";

interface Book {
  id: number;
  name: string;
  image: string;
  price: number;
}

const Books = ({ books, label }: { books: Book[], label: string }) => {
  return (
    <div>
      <Text size={"6"} className="text-zinc-700 font-medium">
        {label}
      </Text>
      <Grid columns={{ initial: "2", md: "4" }} gap={"6"} my={"4"}>
        {["1", "2", "3", "4"].map((book) => (
          <Card />
        ))}
      </Grid>
    </div>
  );
};

export default Books;
