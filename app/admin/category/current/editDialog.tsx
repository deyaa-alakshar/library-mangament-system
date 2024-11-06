"use client";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ErrorMessage from "@/app/components/errorMessage";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { Category } from "./categoriesData";

const categorySchema = zod.object({
  name: zod
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(255, "Category name can't be more than 255 characters"),
});

const EditDialog = ({
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
      const promise = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/categories/${values.id}`,
        values,
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
      initialValues={category}
      validationSchema={toFormikValidationSchema(categorySchema)}
      enableReinitialize
    >
      {({ submitForm, values, setFieldValue, errors, touched, resetForm }) => (
        <Form>
          <Dialog.Root
            open={isOpen}
            onOpenChange={() => {
              setIsOpen(false);
              resetForm();
            }}
          >
            <IconButton
              type="button"
              onClick={() => setIsOpen(true)}
              variant="ghost"
              color="gray"
            >
              <FiEdit size={"25"} />
            </IconButton>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Edit category</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make changes to your category.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                  <TextField.Root
                    id="name"
                    placeholder="Enter your category name"
                    type="text"
                    variant={errors.name && touched.name ? "soft" : "surface"}
                    color={errors.name && touched.name ? "red" : "violet"}
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    size={"3"}
                  />
                  {errors.name && touched.name ? (
                    <ErrorMessage>{errors.name}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </label>
                <label>
                  <Flex gapX={"4"}>
                    <Switch
                      id="is_active"
                      size="3"
                      checked={values.is_active === 1 ? true : false}
                      onCheckedChange={(e) =>
                        setFieldValue("is_active", e ? 1 : 0)
                      }
                    />{" "}
                    <Text size={"2"} weight={"bold"}>
                      Active category
                    </Text>
                  </Flex>
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsOpen(false);
                  }}
                  variant="soft"
                  color="gray"
                >
                  Cancel
                </Button>

                <Button type="submit" onClick={submitForm} disabled={isLoading}>
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

export default EditDialog;
