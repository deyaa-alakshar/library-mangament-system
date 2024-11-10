import React from "react";
import ProductPhotos from "./productPhotos";
import ProductInfo from "./productInfo";
import { Grid } from "@radix-ui/themes";

export interface Book {
  id: number;
  image: string;
  category_id: 11;
  title: string;
  author: string;
  available_copies: number;
  price: number;
  booking_price: number;
  is_active: number;
  isbn: number;
  deleted_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  category: {
    id: number;
    name: string;
  };
}

const ProductDetails = ({ book }: { book: Book }) => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <ProductPhotos book={book} />
      <ProductInfo book={book} />
    </Grid>
  );
};

export default ProductDetails;
