"use client";
import { Form, Formik } from "formik";
import logo from "./public/Company logo.png";
import Image from "next/image";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import * as zod from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ErrorMessage from "./components/errorMessage";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface form {
  email: string;
  password: string;
  remember?: boolean;
}

const initial: form = {
  email: "",
  password: "",
};

const loginSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string(),
  // .min(8, "Password must be at least 6 characters")
  // .max(255, "Password can't be more than 255 characters")
  // .regex(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  // ),
});

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: form) => {
    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });

    try {
      setIsLoading(true);
      const promise = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/login`,
        values
      );
      if (promise.status === 200) {
        setIsLoading(false);
        Cookies.set("userInfo", JSON.stringify(promise.data.data));
        if (promise.data.data.user.role_name === "SuperAdmin") {
          toast.update(loadingToastId, {
            render: "Welcome back",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          router.push("/admin/books/add");
        } else {
          router.push("/dashboard/home");
        }
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

  const handleSignUp = () => {
    const params = new URLSearchParams();
    params.append("signUp", "true");
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      <Formik
        initialValues={initial}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={toFormikValidationSchema(loginSchema)}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Image src={logo} alt="logo" className="m-auto mb-4" />
            <div className="flex flex-col space-y-2 mb-4 text-center">
              <Heading as="h1" weight="bold" size="8">
                Log in to your account
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
                  value={values.email}
                  variant={errors.email && touched.email ? "soft" : "surface"}
                  color={errors.email && touched.email ? "red" : "violet"}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                  size={"3"}
                />
                {errors.email && touched.email ? (
                  <ErrorMessage>{errors.email}</ErrorMessage>
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
                  value={values.password}
                  variant={
                    errors.password && touched.password ? "soft" : "surface"
                  }
                  color={errors.password && touched.password ? "red" : "violet"}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  size={"3"}
                />
                {errors.password && touched.password ? (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                ) : (
                  ""
                )}
              </Flex>
            </Flex>
            <Flex direction="column" gapY="4">
              <Flex justify="between" direction="row" className="my-4">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Checkbox
                      size={"3"}
                      onCheckedChange={(e) => setFieldValue("remember", e)}
                      checked={values.remember}
                    />
                    Remember for 30 days
                  </Flex>
                </Text>
                <Text as="label" color="violet" weight="bold">
                  Forgot password
                </Text>
              </Flex>
              <Button
                type="submit"
                disabled={isLoading}
                size="3"
                className="w-full cursor-pointer"
              >
                Sign in
              </Button>
              <Text as="label" size="3" align="center">
                Don’t have an account?
                <Text
                  as="span"
                  color="violet"
                  weight="bold"
                  className="cursor-pointer mx-1"
                  onClick={handleSignUp}
                >
                  Sign up
                </Text>
              </Text>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignInForm;
