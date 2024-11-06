import { Button, Dialog, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
import { FaInfo } from "react-icons/fa6";
import React from "react";
import { Book } from "./booksData";


const ViewDialog = ({ book }: { book: Book }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton type="button" variant="ghost" color="gray">
          <FaInfo size={"25"} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth={"1000px"}>
        <Dialog.Title>View Book</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Showing information about the book.
        </Dialog.Description>

        <Grid columns={{ initial: "2" }} gapY={"4"}>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Id :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.id}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Title :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.title}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Author :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.author}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Category :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.category.id}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Available copies :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.available_copies}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Active :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.is_active === 1 ? "Active" : "Inactive"}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Price :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.price}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Booking price :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {book.booking_price}
            </Text>
          </Flex>
        </Grid>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ViewDialog;
