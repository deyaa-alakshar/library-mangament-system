"use client";
import { Badge, Box, Button, Dialog, Flex, Select } from "@radix-ui/themes";
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
  status: zod
    .string()
    .min(1, "You need to choose what you whant to do with this request"),
});

interface status {
  status: string;
}

const initial: status = {
  status: "in_progress",
};

const StatusDialog = ({
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
        `${process.env.NEXT_PUBLIC_URL}/bookings/${reserved.id}/status`,
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
            {reserved.status === "pending" && (
              <Badge
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
                color="orange"
              >
                pending
              </Badge>
            )}
            {reserved.status === "in_progress" && (
              <Badge
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
                color="blue"
              >
                In progress
              </Badge>
            )}
            {reserved.status === "completed" && (
              <Badge
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
                color="green"
              >
                Completed
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
                      setFieldValue("status", value);
                    }}
                    defaultValue="in_progress"
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
                        <Select.Item value={"in_progress"}>
                          {" "}
                          In progress
                        </Select.Item>
                        <Select.Item value={"completed"}>Completed</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                  {errors.status && touched.status ? (
                    <ErrorMessage>{errors.status}</ErrorMessage>
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

export default StatusDialog;
