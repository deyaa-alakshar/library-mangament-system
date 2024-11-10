"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Book } from "./page";
import { useRouter } from "next/navigation";

const CheckoutDialog = ({ basket }: { basket: Book[] }) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isOpen, setIsOpen] = useState<any>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsOpen(false);

    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });

    const data = basket.map((item) => {
      return { book_id: item.id, quantity: item.quantity };
    });

    try {
      const userInfo = JSON.parse(Cookies.get("userInfo")!);
      const promise = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/carts`,
        { items: [...data] },
        {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
          },
        }
      );
      setIsLoading(true);
      if (promise.status === 200) {
        setIsLoading(false);

        toast.update(loadingToastId, {
          render: "Successfuly added to your purchases",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        Cookies.remove("cart");
        router.push("/dashboard/home");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.update(loadingToastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      console.log(error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button
        size={"3"}
        className="cursor-pointer"
        onClick={() =>
          basket.length > 0
            ? setIsOpen(true)
            : toast.info("Your fucking basket is fucking empty bro fuck off", { position: "bottom-left" })
        }
      >
        Procced to Chekout
      </Button>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Change status</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {`Are you sure you want to buy this`}.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            variant="soft"
            color="gray"
          >
            Cancel
          </Button>

          <Button type={"submit"} onClick={handleSubmit} disabled={isLoading}>
            Buy
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CheckoutDialog;
