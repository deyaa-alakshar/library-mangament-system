"use client";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { Book } from "./booksData";


const StatuesDialog = ({
  book,
  refetch,
}: {
  book: Book;
  refetch: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (values: Book) => {
    setIsLoading(true);
    setIsOpen(false);

    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });

    try {
      const userInfo = JSON.parse(Cookies.get("userInfo")!);
      const promise = await axios.patch(
        `${process.env.NEXT_PUBLIC_URL}/book-activation/${values.id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
          },
        }
      );
      setIsLoading(true);
      if (promise.status === 200) {
        setIsLoading(false);
        refetch();

        toast.update(loadingToastId, {
          render: "Changes has been made successfuly",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.update(loadingToastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={book}>
      {({ submitForm }) => (
        <Form>
          <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
            {book.is_active === 1 ? (
              <Button
                onClick={() => setIsOpen(true)}
                type="button"
                size={"3"}
                variant="solid"
              >
                Deactivate
              </Button>
            ) : (
              <Button
                onClick={() => setIsOpen(true)}
                type="button"
                size={"3"}
                variant="solid"
                color="gray"
              >
                Activate
              </Button>
            )}

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Change status</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                {`Are you sure you want to ${
                  book.is_active === 1 ? "deactivate" : "activate"
                } book`}
                .
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

                <Button
                  type={"submit"}
                  onClick={submitForm}
                  disabled={isLoading}
                >
                  Save
                </Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Form>
      )}
    </Formik>
  );
};

export default StatuesDialog;
