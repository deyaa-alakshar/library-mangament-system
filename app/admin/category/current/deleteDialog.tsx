"use client";
import { Button, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { Category } from "./categoriesData";


const DeleteDialog = ({
  category,
  refetch,
}: {
  category: Category;
  refetch: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (values: Category) => {
    setIsLoading(true);
    setIsOpen(false);

    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });

    try {
      const userInfo = JSON.parse(Cookies.get("userInfo")!);
      const promise = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/categories/${values.id}`,

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
          render: "Deleted successfuly",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
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
    }
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={category} enableReinitialize>
      {({ submitForm }) => (
        <Form>
          <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <IconButton
              type="button"
              onClick={() => setIsOpen(true)}
              variant="ghost"
              color="gray"
            >
              <MdDeleteOutline size={"25"} />
            </IconButton>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Delete category</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Are you sure you want to delete the category
              </Dialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  variant="soft"
                  color="gray"
                >
                  Cancel
                </Button>
                <Button
                  type={"submit"}
                  onClick={submitForm}
                  disabled={isLoading}
                  color="red"
                >
                  Deltete
                </Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Form>
      )}
    </Formik>
  );
};

export default DeleteDialog;
