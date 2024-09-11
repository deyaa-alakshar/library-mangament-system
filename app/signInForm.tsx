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
  password: string;
  remember: boolean;
}

const initial: form = {
  email: "",
  password: "",
  remember: true,
};

const SignInForm = () => {
  const router = useRouter();

  const handleSubmit = (values: form) => {};

  const handleSignUp = () => {
    const params = new URLSearchParams();
    params.append("signUp", "true");  
    router.push(`/?${params.toString()}`);
  };

  return (
    <Formik initialValues={initial} onSubmit={(values) => handleSubmit(values)}>
      {({ values, setFieldValue }) => (
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
                onChange={(e) => setFieldValue("email", e.target.value)}
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
            <Flex justify="between" direction="row" className="my-4">
              <Text as="label" size="2">
                <Flex gap="2">
                  <Checkbox defaultChecked checked={values.remember} />
                  Remember for 30 days
                </Flex>
              </Text>
              <Text as="label" color="violet" weight="bold">
                Forgot password
              </Text>
            </Flex>
            <Button size="3" className="w-full">
              Sign in
            </Button>
            <Text as="label" size="3" align="center">
              Don’t have an account?
              <Text
                as="span"
                color="violet"
                weight="bold"
                className="cursor-pointer"
                onClick={handleSignUp}
              >
                Sign up
              </Text>
            </Text>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
export default SignInForm;
