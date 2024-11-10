import React from "react";
import { Grid } from "@radix-ui/themes";
import Image from "next/image";
import { Book } from "./productDetails";

const ProductPhotos = ({ book }: { book: Book }) => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} my={"4"}>
      <Grid columns={{ initial: "1", md: "2" }}>
        <Image
          src={"https://svu-pr1.somar-kesen.com" + book.image}
          width={"412"}
          height={"653"}
          alt="Photo cover"
          className="rounded-md max-w-max"
        />
      </Grid>
    </Grid>
  );
};

export default ProductPhotos;
