import { Button, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import React from "react";
import Image from "next/image";
import mapImage from '../../public/Mapsicle Map.png';

const Subscribe = () => {
  return (
    <Grid className="sm:p-2" columns={{ initial: "1", md: "2"}} my={"4"} gap={"4"} align={"center"}>
      <Flex direction={"column"} gapY={"4"}>
        <Text size={"5"} className="text-zinc-900 font-medium">
          Did you know us?{" "}
        </Text>
        <Text size={"2"} className="text-zinc-900 font-medium">
          We are about books and our purpose is to show you the book who can
          chage your life or distract you from the real world în a better one.
          BWorld works with the must popular publishs just for your delight. If
          you are about books, you must to subscribe to our newsletter.{" "}
        </Text>
        <TextField.Root
          id="name"
          placeholder="Your name"
          type="text"
          variant="surface"
        ></TextField.Root>
        <TextField.Root
          id="email"
          placeholder="Your email"
          type="email"
          variant="surface"
        ></TextField.Root>
        <Button size={"3"}>Subscribe</Button>
      </Flex>
      <Image className="sm-" src={mapImage} alt="Map iamge" width={"576"} height={"466"} />
    </Grid>
  );
};

export default Subscribe;
