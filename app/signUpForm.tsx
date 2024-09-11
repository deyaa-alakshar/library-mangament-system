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

interface form {
  email: string;
  userName: string;
  password: string;
  seller: boolean;
}

const initial: form = {
  email: "",
  userName: "",
  password: "",
  seller: false,
};

const SignInUpForm = () => {
  const router = useRouter();

  const handleSubmit = (values: form) => {};

  const handleSignIn = () => {
    router.push("/");
  };

  return (
    <Formik initialValues={initial} onSubmit={(values) => handleSubmit(values)}>
      {({ values, setFieldValue }) => (
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
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
              ></TextField.Root>
            </Flex>
            <Flex direction="column" gapY="1">
              <Label.Root htmlFor="userName">User name</Label.Root>
              <TextField.Root
                id="userName"
                placeholder="Enter your userName"
                type="text"
                value={values.userName}
                onChange={(e) => setFieldValue("userName", e.target.value)}
              ></TextField.Root>
            </Flex>
            <Flex direction="column" gapY="1">
              <Label.Root htmlFor="password">Password</Label.Root>
              <TextField.Root
                id="password"
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
              ></TextField.Root>
            </Flex>
          </Flex>
          <Flex direction="column" gapY="4">
            <Button size="3" className="w-full">
              Sign Up
            </Button>
            <Text as="label" size="3" align="center">
              have an account?
              <Text
                as="span"
                color="violet"
                weight="bold"
                className="cursor-pointer"
                onClick={handleSignIn}
              >
                Sign In
              </Text>
            </Text>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
export default SignInUpForm;
