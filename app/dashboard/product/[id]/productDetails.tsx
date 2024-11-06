import React from "react";
import ProductPhotos from "./productPhotos";
import ProductInfo from "./productInfo";
import { Grid } from "@radix-ui/themes";

const ProductDetails = () => {
  return (
    <Grid columns={{initial: "1", md: "2"}} gap={"4"}>
      <ProductPhotos />
      <ProductInfo />
    </Grid>
  );
};

export default ProductDetails;
