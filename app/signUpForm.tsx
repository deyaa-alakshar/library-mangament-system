"use client";
import { Form, Formik } from "formik";
import logo from "./public/Company logo.png";
import Image from "next/image";
import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ErrorMessage from "./components/errorMessage";
import { toast } from "react-toastify";

interface form {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  seller: boolean;
}

const initial: form = {
  email: "",
  name: "",
  password: "",
  password_confirmation: "",
  seller: false,
};

const signUpSchema = zod
  .object({
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
      ),
    password_confirmation: zod
      .string()
      .min(8, "Password must be at least 6 characters")
      .max(255, "Password can't be more than 255 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

const SignInUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: form) => {
    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });

    try {
      const promise = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/register`,
        values
      );
      setIsLoading(true);
      if (promise.status === 200) {
        setIsLoading(false);
        Cookies.set("userInfo", JSON.stringify(promise.data.data));
        router.push("/");
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

  const handleSignIn = () => {
    router.push("/");
  };

  return (
    <Formik
      initialValues={initial}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={toFormikValidationSchema(signUpSchema)}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <Image src={logo} alt="logo" className="m-auto mb-4" />
          <div className="flex flex-col space-y-2 mb-4 text-center">
            <Heading as="h1" weight="bold" size="8">
              Sign up
            </Heading>
            <Heading
              as="h4"
              weight="medium"
              size="4"
              className="text-slate-300"
            >
              Welcome back! please enter your details.
            </Heading>
          </div>

          <Flex direction="column" gapY="4">
            <Flex direction="column" gapY="1">
              <Label.Root htmlFor="email">Email</Label.Root>
              <TextField.Root
                id="email"
                placeholder="Enter your email"
                type="email"
                variant={errors.email && touched.email ? "soft" : "surface"}
                color={errors.email && touched.email ? "red" : "violet"}
                onChange={(e) => setFieldValue("email", e.target.value)}
                size={"3"}
              />
              {errors.email && touched.email ? (
                <ErrorMessage>{errors.email}</ErrorMessage>
              ) : (
                ""
              )}
            </Flex>
            <Flex direction="column" gapY="1">
              <Label.Root htmlFor="name">User name</Label.Root>
              <TextField.Root
                id="name"
                placeholder="Enter your user name"
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
            </Flex>
            <Flex direction="column" gapY="1">
              <Label.Root htmlFor="password">Password</Label.Root>
              <TextField.Root
                id="password"
                placeholder="Enter your password"
                type="password"
                variant={
                  errors.password && touched.password ? "soft" : "surface"
                }
                color={errors.password && touched.password ? "red" : "violet"}
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                size={"3"}
              />
              {errors.password && touched.password ? (
                <ErrorMessage>{errors.password}</ErrorMessage>
              ) : (
                ""
              )}
            </Flex>
            <Flex direction="column" gapY="1">
              <Label.Root htmlFor="password_confirmation">
                Confirme password
              </Label.Root>
              <TextField.Root
                id="password_confirmation"
                placeholder="Enter your password confirmation"
                type="password"
                variant={
                  errors.password_confirmation && touched.password_confirmation
                    ? "soft"
                    : "surface"
                }
                color={
                  errors.password_confirmation && touched.password_confirmation
                    ? "red"
                    : "violet"
                }
                value={values.password_confirmation}
                onChange={(e) =>
                  setFieldValue("password_confirmation", e.target.value)
                }
                size={"3"}
              />
              {errors.password_confirmation && touched.password_confirmation ? (
                <ErrorMessage>{errors.password_confirmation}</ErrorMessage>
              ) : (
                ""
              )}
            </Flex>
            <Flex direction="column" gapY="4">
              <Button
                disabled={isLoading}
                type="submit"
                size="3"
                className="w-full cursor-pointer"
              >
                Sign Up
              </Button>
              <Text as="label" size="3" align="center">
                have an account?
                <Text
                  as="span"
                  color="violet"
                  weight="bold"
                  className="cursor-pointer mx-1"
                  onClick={handleSignIn}
                >
                  Sign In
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
export default SignInUpForm;
