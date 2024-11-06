import React from "react";
import { Container, Flex, Table, Text, IconButton } from "@radix-ui/themes";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import ss from "../../public/VISA-card-logo- 1.png";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

const Cart = () => {
  return (
    <Container>
      <div className="my-8">
        <Text
          size={"6"}
          className="text-zinc-900 font-semibold text-center block"
        >
          Cart
        </Text>
        <Table.Root>
          <Table.Header className="font-semibold">
            <Table.Row>
              <Table.ColumnHeaderCell>Products</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="text-center">Subtotal</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {["1", "2", "3"].map((element) => (
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {" "}
                  <Flex gap={"4"}>
                    <FaRegTrashAlt size={"30"} />
                    <Image
                      src={ss}
                      alt="Photo image"
                      width={"77"}
                      height={"116"}
                    />
                    <Text size={"3"} className="text-zinc-500">
                      Chain of Gold: The Last Hours #1
                    </Text>
                  </Flex>
                </Table.ColumnHeaderCell>
                <Table.Cell className="text-center">
                  <Text size={"3"} className="text-zinc-900 font-semibold">
                    12.49 $
                  </Text>
                </Table.Cell>
                <Table.Cell className="text-center">
                  <Flex gapX={"4"} justify={"center"}>
                    <IconButton variant="outline" radius="full">
                      <LuMinus width="6" height="6" />
                    </IconButton>
                    <Text size={"3"} className="text-zinc-900 font-semibold">
                      $12.49
                    </Text>
                    <IconButton variant="outline" radius="full">
                      <LuPlus width="6" height="6" />
                    </IconButton>
                  </Flex>
                </Table.Cell>
                <Table.Cell className="text-center">
                  <Text size={"3"} className="text-zinc-900 font-semibold">
                    $12.49
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </Container>
  );
};

export default Cart;
