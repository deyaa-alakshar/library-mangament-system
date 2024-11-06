"use client";
import Image from "next/image";
import React, { useState } from "react";
import ss from "../../public/login cover.png";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const Carousel = ({ products }: { products: Product[] }) => {
  return (
    <ResponsiveCarousel
      showArrows={true}
      showIndicators={true}
      infiniteLoop={true}
      dynamicHeight={false}
      centerMode={false}
    >
      {["1", "2"].map((product, index) => (
        <div key={index} className="sm:block md:flex justify-between p-8">
          <Flex direction={"column"} gapY={"6"} justify={"start"}>
            <div className="text-start">
              <Button size={"3"} variant="outline">
                Author of august
              </Button>
            </div>
            <Text size={"8"} className="text-zinc-950 text-start">
              Eric-Emanuel Schmitt{" "}
            </Text>
            <Text size={"3"} className="text-zinc-800 w-1/2 text-start">
              Eric-Emmanuel Schmitt has been awarded more than 20 literary
              prizes and distinctions, and in 2001 he received the title of
              Chevalier des Arts et des Lettres. His books have been translated
              into over 40 languages.
            </Text>
            <div className="text-start">
              {" "}
              <Button variant="solid" size={"3"}>
                View his boooks
              </Button>
            </div>
          </Flex>
          <Flex>
            <Image src={ss} alt="..." width={"323"} height={"452"} />
          </Flex>
        </div>
      ))}
    </ResponsiveCarousel>
  );
};

export default Carousel;
