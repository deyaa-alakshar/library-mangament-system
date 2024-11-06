"use client";
import { Button, Dialog, Flex, IconButton, Text } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { FaTrashRestore } from "react-icons/fa";
import { toast } from "react-toastify";
import { User } from "./archivedData";


const RestoreDialog = ({
  user,
  refetch,
}: {
  user: User;
  refetch: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (values: User) => {
    setIsLoading(true);
    setIsOpen(false);

    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });

    try {
      const userInfo = JSON.parse(Cookies.get("userInfo")!);
      const promise = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/parts/${values.id}/restore`,
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
          render: "Restored successfuly",
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
    <Formik onSubmit={handleSubmit} initialValues={user} enableReinitialize>
      {({ submitForm }) => (
        <Form>
          <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <IconButton
              type="button"
              onClick={() => setIsOpen(true)}
              variant="ghost"
              color="gray"
            >
              <FaTrashRestore size={"25"} />
            </IconButton>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Restore user</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Are you sure you want to restore this user
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
                >
                  Restore
                </Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Form>
      )}
    </Formik>
  );
};

export default RestoreDialog;
