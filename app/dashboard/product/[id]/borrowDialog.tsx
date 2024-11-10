import { Box, Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { ErrorMessage, Form, Formik } from "formik";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Book } from "./productDetails";

const getCurrentDate = () => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return currentDate;
};

const borrowSchema = zod.object({
  due_date: zod.string({ message: "You must pik a day" }),
});

const BorrowDialog = ({ book }: { book: Book }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isOpen, setIsOpen] = useState<any>(false);

  const handleSubmit = async (values: { due_date: string }) => {
    setIsLoading(true);
    setIsOpen(false);

    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });
    try {
      const userInfo = JSON.parse(Cookies.get("userInfo")!);
      const promise = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/bookings/${book.id}/borrow`,
        values,
        {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
          },
        }
      );
      setIsLoading(true);
      if (promise.status === 201) {
        setIsLoading(false);

        toast.update(loadingToastId, {
          render: "Added to borrow list successfuly",
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
    <Formik
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(borrowSchema)}
      initialValues={{
        due_date: getCurrentDate(),
      }}
    >
      {({ errors, touched, values, setFieldValue, submitForm, resetForm }) => (
        <Form>
          <Dialog.Root
            open={isOpen}
            onOpenChange={() => {
              setIsOpen(false);
              resetForm();
            }}
          >
            <Button
              type="button"
              onClick={() => setIsOpen(true)}
              style={{ flexGrow: "1" }}
              size={"4"}
              variant={"outline"}
              className="cursor-pointer"
            >
              Borrow
            </Button>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Select Date</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Please select for how long you are intent to borrow it.
              </Dialog.Description>

              <Box>
                <Label.Root htmlFor="due_date">Retering date</Label.Root>
                <TextField.Root
                  id="due_date"
                  placeholder="Enter your retering date"
                  type="date"
                  variant={
                    errors.due_date && touched.due_date ? "soft" : "surface"
                  }
                  value={values.due_date}
                  color={errors.due_date && touched.due_date ? "red" : "violet"}
                  onChange={(e) => setFieldValue("due_date", e.target.value)}
                  size={"3"}
                />
                <ErrorMessage
                  name="due_date"
                  component="div"
                  className="text-red-500"
                />
              </Box>

              <Flex gap="3" mt="4" justify="end">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="soft"
                  color="gray"
                  className=""
                >
                  Cancel
                </Button>

                <Button type="submit" onClick={submitForm}>
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

export default BorrowDialog;
