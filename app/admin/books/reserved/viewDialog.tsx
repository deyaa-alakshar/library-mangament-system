import { Button, Dialog, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
import { FaInfo } from "react-icons/fa6";
import React from "react";
import { Reserved } from "./reservedData";

const ViewDialog = ({ reserved }: { reserved: Reserved }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton type="button" variant="ghost" color="gray">
          <FaInfo size={"25"} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth={"1000px"}>
        <Dialog.Title>View reserved</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Showing information about the reserved.
        </Dialog.Description>

        <Grid columns={{ initial: "2" }} gapY={"4"}>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Id :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.id}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Title :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.book.title}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Author :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.book.author}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              User :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.user.name}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Book available copies :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.book.available_copies}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Is the book active :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.book.is_active === 1 ? "Active" : "Inactive"}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Book price :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.book.price}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Booking price :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {reserved.book.booking_price}
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
