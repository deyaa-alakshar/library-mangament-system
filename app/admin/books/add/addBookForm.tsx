"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  Select,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as zod from "zod";
import ErrorMessage from "@/app/components/errorMessage";
import MyDropzone from "@/app/components/myDrobZone";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Category {
  id: number;
  name: string;
  is_active: number;
}

interface form {
  title: string;
  author: string;
  is_active: number;
  category_id: number;
  image: any;
  available_copies: string;
  price: string;
  booking_price: string;
  isbn: string;
}

const initial: form = {
  title: "",
  author: "",
  is_active: 0,
  category_id: 0,
  image: null,
  available_copies: "",
  price: "",
  booking_price: "",
  isbn: "",
};

const addBookSchema = zod.object({
  title: zod
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title can't be more than 255 characters"),
  author: zod
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(255, "Title can't be more than 255 characters"),
  is_active: zod.number(),
  category_id: zod.number().int().min(1, "Category is required"),
  image: zod

    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // 5MB limit
      message: "File size should be 5MB or less",
    }),

  available_copies: zod
    .string()
    .min(1, "Number of copies is required")
    .max(255, "Id can't be more than 255"),
  price: zod.string().min(1, "Price is required"),
  booking_price: zod
    .string()
    .min(1, "Booking price is required")
    .max(255, "Booking price can't be more than 255"),
  isbn: zod
    .string()
    .min(1, "Id is required")
    .max(255, "Id can't be more than 255"),
});

const AddBookForm = ({ categories }: { categories: Category[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: form) => {
    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });

    try {
      setIsLoading(true);
      const userInfo = JSON.parse(Cookies.get("userInfo")!);
      const promise = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/books`,
        values,
        {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
          },
        }
      );
      if (promise.status === 200) {
        setIsLoading(false);

        toast.update(loadingToastId, {
          render: "Book added successfuly",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        router.refresh();
      }
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
    <Box className="md:w-1/2 p-2">
      <Formik
        initialValues={initial}
        validationSchema={toFormikValidationSchema(addBookSchema)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Flex direction={"column"} gapY={"4"} py={"2"}>
              {" "}
              <Text size={"8"} className="text-zinc-900 font-semibold">
                Add a book
              </Text>
              <Grid columns={{ initial: "1", md: "2" }} gapY={"4"} gapX={"4"}>
                <Box>
                  <Label.Root htmlFor="title">Book name</Label.Root>
                  <TextField.Root
                    id="title"
                    placeholder="Enter your title"
                    type="text"
                    variant={errors.title && touched.title ? "soft" : "surface"}
                    color={errors.title && touched.title ? "red" : "violet"}
                    onChange={(e) => setFieldValue("title", e.target.value)}
                    size={"3"}
                  />
                  {errors.title && touched.title ? (
                    <ErrorMessage>{errors.title}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </Box>
                <Box>
                  <Label.Root htmlFor="author">Author name</Label.Root>
                  <TextField.Root
                    id="author"
                    placeholder="Enter your author"
                    type="text"
                    variant={
                      errors.author && touched.author ? "soft" : "surface"
                    }
                    color={errors.author && touched.author ? "red" : "violet"}
                    onChange={(e) => setFieldValue("author", e.target.value)}
                    size={"3"}
                  />
                  {errors.author && touched.author ? (
                    <ErrorMessage>{errors.author}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </Box>
                <Box>
                  <Label.Root htmlFor="title">Book category</Label.Root>
                  <Box>
                    <Select.Root
                      size={"3"}
                      onValueChange={(value) => {
                        setFieldValue("category_id", parseInt(value));
                      }}
                      value={values.category_id.toString()}
                      defaultValue="1"
                    >
                      <Select.Trigger
                        style={{ width: "100%" }}
                        className="w-full"
                      />
                      <Select.Content
                        style={{ width: "100%" }}
                        className="w-full"
                      >
                        <Select.Group>
                          <Select.Label>Categories</Select.Label>
                          {categories?.map((category) => (
                            <Select.Item
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                    {errors.category_id && touched.category_id ? (
                      <ErrorMessage>{errors.category_id}</ErrorMessage>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                <Box>
                  <Label.Root htmlFor="isbn">Book ID</Label.Root>
                  <TextField.Root
                    id="isbn"
                    placeholder="Enter your book id"
                    type="number"
                    variant={errors.isbn && touched.isbn ? "soft" : "surface"}
                    color={errors.isbn && touched.isbn ? "red" : "violet"}
                    onChange={(e) => setFieldValue("isbn", e.target.value)}
                    size={"3"}
                  />
                  {errors.isbn && touched.isbn ? (
                    <ErrorMessage>{errors.isbn}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </Box>
                <Box>
                  <Label.Root htmlFor="available_copies">
                    Available copies
                  </Label.Root>
                  <TextField.Root
                    id="available_copies"
                    placeholder="Enter how many copies"
                    type="number"
                    variant={
                      errors.available_copies && touched.available_copies
                        ? "soft"
                        : "surface"
                    }
                    color={
                      errors.available_copies && touched.available_copies
                        ? "red"
                        : "violet"
                    }
                    onChange={(e) =>
                      setFieldValue("available_copies", e.target.value)
                    }
                    size={"3"}
                  />
                  {errors.available_copies && touched.available_copies ? (
                    <ErrorMessage>{errors.available_copies}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
              <MyDropzone
                onFilesSelected={(file) => setFieldValue("image", file[0])}
              />
              <Grid columns={{ initial: "1", md: "2" }} gapY={"4"} gapX={"4"}>
                {" "}
                <Box>
                  <Label.Root htmlFor="price">Book price</Label.Root>
                  <TextField.Root
                    id="price"
                    placeholder="Enter your book id"
                    type="text"
                    variant={errors.price && touched.price ? "soft" : "surface"}
                    color={errors.price && touched.price ? "red" : "violet"}
                    onChange={(e) => setFieldValue("price", e.target.value)}
                    size={"3"}
                  />
                  {errors.price && touched.price ? (
                    <ErrorMessage>{errors.price}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </Box>
                <Box>
                  <Label.Root htmlFor="booking_price">Booking price</Label.Root>
                  <TextField.Root
                    id="booking_price"
                    placeholder="Enter your book id"
                    type="text"
                    variant={
                      errors.booking_price && touched.booking_price
                        ? "soft"
                        : "surface"
                    }
                    color={
                      errors.booking_price && touched.booking_price
                        ? "red"
                        : "violet"
                    }
                    onChange={(e) =>
                      setFieldValue("booking_price", e.target.value)
                    }
                    size={"3"}
                  />
                  {errors.booking_price && touched.booking_price ? (
                    <ErrorMessage>{errors.booking_price}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </Box>
                <Flex gap={"4"}>
                  <Switch size="3" defaultChecked />
                  <Text size={"3"} className="text-zinc-900 font-medium">
                    Is the book active
                  </Text>
                </Flex>
                <Box></Box>
                <Button
                  type="submit"
                  size={"4"}
                  variant="solid"
                  disabled={isLoading}
                  className="my-4 cursor-pointer"
                >
                  Add
                </Button>
              </Grid>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddBookForm;
