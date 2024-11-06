import { Container, Text } from "@radix-ui/themes";
import React from "react";
import CheckoutForm from "./checkoutForm";

const CheckOut = () => {
  return (
    <Container>
      <div className="my-8">
        <Text
          size={"6"}
          className="text-zinc-900 font-semibold text-center block"
        >
          Checkout
        </Text>
        <CheckoutForm />
      </div>
    </Container>
  );
};

export default CheckOut;
