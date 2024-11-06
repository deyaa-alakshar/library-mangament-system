import { Button, Dialog, Flex, Grid, IconButton, Text } from "@radix-ui/themes";
import { FaInfo } from "react-icons/fa6";
import React from "react";
import { User } from "./usersData";


const convertDate = (dateString: Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");


  const normalDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return normalDate;
};

const ViewDialog = ({ user }: { user: User }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton
          type="button"
          variant="ghost"
          color="gray"
        >
          <FaInfo size={"25"} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>View user</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Showing information about the user.
        </Dialog.Description>

        <Grid columns={{ initial: "2" }} gapY={"4"}>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Id :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {user.id}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Name :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {user.name}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Email :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {user.email}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              email verified :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {user.email_verified_at
                ? convertDate(user.email_verified_at)
                : "Not verified"}
            </Text>
          </Flex>

          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Role :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {user.role_name}
            </Text>
          </Flex>
          <Flex gapX={"3"}>
            <Text className="text-zinc-500" size={"3"}>
              Active :
            </Text>
            <Text className="text-zinc-800" size={"3"}>
              {user.is_active === 1 ? "Active" : "Inactive"}
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
