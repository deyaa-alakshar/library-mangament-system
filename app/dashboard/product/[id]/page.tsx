import { Container } from "@radix-ui/themes";
import React from "react";
import Breadcrumbs from "./breadcrumbs";
import ProductDetails from "./productDetails";
import Books from "../../components/books";

const Product = ({ params }: { params: { id: string } }) => {
  return (
    <Container>
      <Breadcrumbs />
      <ProductDetails />
      <Books books={[]} label="Most Related" />
      <Books books={[]} label="For You" />
    </Container>
  );
};

export default Product;
