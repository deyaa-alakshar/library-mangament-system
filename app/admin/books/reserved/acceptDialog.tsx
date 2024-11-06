"use client";
import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Select,
  Text,
} from "@radix-ui/themes";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { Reserved } from "./reservedData";
import * as Label from "@radix-ui/react-label";
import ErrorMessage from "@/app/components/errorMessage";
import { toFormikValidationSchema } from "zod-formik-adapter";
import * as zod from "zod";

const statusSchema = zod.object({
  request_status: zod
    .string()
    .min(1, "You need to choose what you whant to do with this request"),
});

interface status {
  request_status: string;
}

const initial: status = {
  request_status: "accept",
};

const AcceptDialog = ({
  reserved,
  refetch,
}: {
  reserved: Reserved;
  refetch: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (values: status) => {
    setIsLoading(true);
    setIsOpen(false);

    const loadingToastId = toast.loading("Loading data...", {
      position: "bottom-left",
    });
    try {
      const userInfo = JSON.parse(Cookies.get("userInfo")!);
      const promise = await axios.patch(
        `${process.env.NEXT_PUBLIC_URL}/bookings/${reserved.id}/request-status`,
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
        refetch();

        toast.update(loadingToastId, {
          render: "Status has been changed successfully",
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
      validationSchema={toFormikValidationSchema(statusSchema)}
      initialValues={initial}
    >
      {({ submitForm, setFieldValue, errors, touched }) => (
        <Form>
          <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
            {reserved.request_status === "pending" && (
              <Badge
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
                color="orange"
              >
                pending
              </Badge>
            )}
            {reserved.request_status === "rejected" && (
              <Badge
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
                color="red"
              >
                Rejected
              </Badge>
            )}
            {reserved.request_status === "accepted" && (
              <Badge
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
                color="green"
              >
                Accepted
              </Badge>
            )}

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Change status</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                please select either you want accept the reserved or no
              </Dialog.Description>

              <Box>
                <Label.Root htmlFor="title">Request status option</Label.Root>
                <Box>
                  <Select.Root
                    size={"3"}
                    onValueChange={(value) => {
                      setFieldValue("request_status", value);
                    }}
                    defaultValue="accept"
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
                        <Select.Label>Choose status</Select.Label>
                        <Select.Item value={"accepted"}>Accept</Select.Item>
                        <Select.Item value={"rejected"}>Reject</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                  {errors.request_status && touched.request_status ? (
                    <ErrorMessage>{errors.request_status}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>

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

export default AcceptDialog;
