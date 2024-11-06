"use client";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  RadioGroup,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

enum shippingOptions {
  free = "free",
  local = "local",
  flat = "flat",
  empty = "",
}
enum payOptions {
  bank = "back",
  paypal = "paypal",
  empty = "",
}

interface form {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  townCity: string;
  address: string;
  phone: string;
  email: string;
  shipping: shippingOptions;
  pay: payOptions;
  save: boolean;
  note: string;
}

const initial: form = {
  firstName: "",
  lastName: "",
  companyName: "",
  country: "",
  townCity: "",
  address: "",
  phone: "",
  email: "",
  shipping: shippingOptions.empty,
  pay: payOptions.empty,
  save: true,
  note: "",
};

const CheckoutForm = () => {
  const router = useRouter();
  const handleSubmit = (values: form) => {};

  return (
    <Formik initialValues={initial} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <Grid
            columns={{ initial: "1", md: "2" }}
            my={"8"}
            style={{ gridTemplateColumns: "70% 30%" }}
            gapX={"6"}
          >
            <Box as="div">
              <Text size={"4"} className="text-zinc-900 font-semibold">
                Billing Details :
              </Text>
              <Flex direction={"column"} gap={"4"} my={"6"}>
                <Grid columns={{ initial: "1", md: "2" }} gapX={"4"}>
                  <Box as="div">
                    <Text
                      as="label"
                      htmlFor="firstName"
                      size={"2"}
                      mb={"2"}
                      className="font-semibold block"
                    >
                      First name
                    </Text>
                    <TextField.Root
                      placeholder="Enter your first name"
                      id="firstName"
                      size={"3"}
                    ></TextField.Root>
                  </Box>
                  <Box as="div">
                    <Text
                      as="label"
                      htmlFor="lastName"
                      size={"2"}
                      mb={"2"}
                      className="font-semibold block"
                    >
                      Last name
                    </Text>
                    <TextField.Root
                      placeholder="Enter your last name"
                      id="lastName"
                      size={"3"}
                    ></TextField.Root>
                  </Box>
                </Grid>
                <Box as="div">
                  <Text
                    as="label"
                    htmlFor="companyName"
                    size={"2"}
                    mb={"2"}
                    className="font-semibold block"
                  >
                    Company name
                  </Text>
                  <TextField.Root
                    placeholder="Enter your Company name"
                    id="companyName"
                    size={"3"}
                  ></TextField.Root>
                </Box>
                <Box as="div">
                  <Text
                    as="label"
                    htmlFor="country"
                    size={"2"}
                    mb={"2"}
                    className="font-semibold block"
                  >
                    Country name
                  </Text>
                  <TextField.Root
                    placeholder="Enter your country name"
                    id="countryName"
                    size={"3"}
                  ></TextField.Root>
                </Box>
                <Grid columns={{ initial: "1", md: "2" }} gapX={"4"}>
                  <Box as="div">
                    <Text
                      as="label"
                      htmlFor="townCity"
                      size={"2"}
                      mb={"2"}
                      className="font-semibold block"
                    >
                      Town / City
                    </Text>
                    <TextField.Root
                      placeholder="Home Num and Street Name"
                      id="townCity"
                      size={"3"}
                    ></TextField.Root>
                  </Box>
                  <Box as="div">
                    <Text
                      as="label"
                      htmlFor="address"
                      size={"2"}
                      mb={"2"}
                      className="font-semibold block"
                    >
                      Address
                    </Text>
                    <TextField.Root
                      placeholder="Home Num and Street Name"
                      id="address"
                      size={"3"}
                    ></TextField.Root>
                  </Box>
                </Grid>
                <Grid columns={{ initial: "1", md: "2" }} gapX={"4"}>
                  <Box as="div">
                    <Text
                      as="label"
                      htmlFor="phone"
                      size={"2"}
                      mb={"2"}
                      className="font-semibold block"
                    >
                      Phone
                    </Text>
                    <TextField.Root
                      placeholder="Phone Number"
                      id="phone"
                      size={"3"}
                    ></TextField.Root>
                  </Box>
                  <Box as="div">
                    <Text
                      as="label"
                      htmlFor="email"
                      size={"2"}
                      mb={"2"}
                      className="font-semibold block"
                    >
                      Email
                    </Text>
                    <TextField.Root
                      placeholder="Email"
                      id="email"
                      size={"3"}
                    ></TextField.Root>
                  </Box>
                </Grid>
                <Box as="div">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Checkbox defaultChecked />
                      Save for my Next Payment
                    </Flex>
                  </Text>
                </Box>
                <Box as="div" my={"4"}>
                  <Text
                    as="label"
                    htmlFor="note"
                    size={"2"}
                    mb={"2"}
                    className="font-semibold block"
                  >
                    Order Notes (optional)
                  </Text>
                  <TextArea
                    size="3"
                    id="note"
                    placeholder="Notes about your order , E.G Special notes for dilivery"
                  />
                </Box>
              </Flex>
            </Box>
            <Box as="div">
              <Flex direction={"column"} gap={"4"}>
                <Text size={"4"} className="text-zinc-900 font-semibold">
                  Your Order :
                </Text>
                <Flex
                  justify={"between"}
                  className="border-b border-#9B9B9B border-solid py-4"
                >
                  <Text size={"3"} className="text-zinc-900 font-semibold">
                    Product
                  </Text>
                  <Text size={"3"} className="text-zinc-900 font-semibold">
                    Subtotal
                  </Text>
                </Flex>
                <Flex
                  justify={"between"}
                  className="border-b border-#9B9B9B border-solid py-4"
                >
                  <Text size={"3"} className="text-zinc-900 font-semibold">
                    Shipping
                  </Text>
                  <RadioGroup.Root defaultValue="1">
                    <RadioGroup.Item value="1">Free Shipping</RadioGroup.Item>
                    <RadioGroup.Item value="2">Local : $15.00</RadioGroup.Item>
                    <RadioGroup.Item value="3">
                      Flat Rate : $10.00
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                </Flex>
                <Flex
                  justify={"between"}
                  className="border-b border-#9B9B9B border-solid py-4"
                >
                  <Text size={"3"} className="text-zinc-900 font-semibold">
                    Shipping
                  </Text>
                  <Text size={"3"} className="text-zinc-900 font-semibold">
                    12.49 $
                  </Text>
                </Flex>
                <Flex direction={"column"}>
                  <RadioGroup.Root defaultValue="1">
                    <RadioGroup.Item value="1">
                      Direct Bank Transfer
                    </RadioGroup.Item>
                    <Text size={"2"} className="text-zinc-900 font-medium my-3">
                      Make your payment directly into our bank account please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </Text>

                    <RadioGroup.Item value="2">PayPal</RadioGroup.Item>
                  </RadioGroup.Root>
                </Flex>
              </Flex>
            </Box>
          </Grid>
          <Box as="div" className="text-center">
            <Button size={"4"} my={"4"} className="mx-auto">Confirm Order</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
