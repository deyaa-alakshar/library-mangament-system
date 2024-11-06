import React from "react";
import { Flex, Grid } from "@radix-ui/themes";
import ss from "../../../public/Logo.png";
import dd from "../../../public/login cover.png";
import Image from "next/image";

const ProductPhotos = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} my={"4"}>
      <Grid columns={{ initial: "1", md: "2" }}>
        <Flex direction={"column"} gapY={"4"} justify={"center"}>
          <div className="border border-solid border-#121212 w-20 p-5">
            <Image src={ss} alt="Book photo" width={"59"} height={"116"} />
          </div>
          <div className="border border-solid border-#121212 w-20 p-5">
            <Image src={ss} alt="Book photo" width={"59"} height={"116"} />
          </div>
          <div className="border border-solid border-#121212 w-20 p-5">
            <Image src={ss} alt="Book photo" width={"59"} height={"116"} />
          </div>
          <div className="border border-solid border-#121212 w-20 p-5">
            <Image src={ss} alt="Book photo" width={"59"} height={"116"} />
          </div>
        </Flex>
        <Image
          src={dd}
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
