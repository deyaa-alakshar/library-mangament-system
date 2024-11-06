"use client";
import ErrorMessage from "@/app/components/errorMessage";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  RadioGroup,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Cookies from "js-cookie";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { User } from "./usersData";

const addUserSchema = zod.object({
  name: zod
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(255, "Username can't be more than 255 characters"),
  email: zod.string().email("Invalid email address"),
  password: zod
    .string()
    .min(8, "Password must be at least 6 characters")
    .max(255, "Password can't be more than 255 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .optional(),
});

const EditDialog = ({ user, refetch }: { user: User; refetch: () => void }) => {
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
      const promise = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/users/${values.id}`,
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
      initialValues={user}
      validationSchema={toFormikValidationSchema(addUserSchema)}
      enableReinitialize
    >
      {({ values, touched, errors, setFieldValue, resetForm, submitForm }) => (
        <Form>
          <Dialog.Root
            open={isOpen}
            onOpenChange={() => {
              setIsOpen(false);
              resetForm();
            }}
          >
            <IconButton
              onClick={() => setIsOpen(true)}
              type="button"
              variant="ghost"
              color="gray"
            >
              <FiEdit size={"25"} />
            </IconButton>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title> Add user</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Add a new user
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                  <TextField.Root
                    id="name"
                    placeholder="Enter the user name"
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
                  <Text as="div" size="2" mb="1" weight="bold">
                    Email
                  </Text>
                  <TextField.Root
                    id="email"
                    placeholder="Enter the user email"
                    type="text"
                    variant={errors.email && touched.email ? "soft" : "surface"}
                    color={errors.email && touched.email ? "red" : "violet"}
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    size={"3"}
                  />
                  {errors.email && touched.email ? (
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Password
                  </Text>
                  <TextField.Root
                    id="password"
                    placeholder="Enter the user password"
                    type="password"
                    variant={
                      errors.password && touched.password ? "soft" : "surface"
                    }
                    color={
                      errors.password && touched.password ? "red" : "violet"
                    }
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    size={"3"}
                  />
                  {errors.password && touched.password ? (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </label>
                <label>
                  <Flex gapX={"4"}>
                    <RadioGroup.Root
                      color="indigo"
                      value={values.role_name}
                      onValueChange={(e) => setFieldValue("role_name", e)}
                    >
                      <Flex gapX={"2"} align={"center"}>
                        <RadioGroup.Item value="User" />
                        <Text size={"3"} className="font-medium text-zinc-900">
                          User
                        </Text>
                      </Flex>
                      <Flex gapX={"2"} align={"center"}>
                        <RadioGroup.Item value="SuperAdmin" />
                        <Text size={"3"} className="font-medium text-zinc-900">
                          Super admin
                        </Text>
                      </Flex>
                    </RadioGroup.Root>
                  </Flex>
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  variant="soft"
                  color="gray"
                >
                  Cancel
                </Button>

                <Button onClick={submitForm} type="submit" disabled={isLoading}>
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
