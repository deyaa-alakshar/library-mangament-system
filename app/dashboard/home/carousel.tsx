"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Books } from "@/app/util/interfaces";
import { useRouter } from "next/navigation";

const Carousel = ({ books }: { books: Books }) => {
  const router = useRouter();

  console.log(books)

  return (
    <Swiper
      pagination={{
        type: "bullets",
      }}
      navigation={true}
      modules={[Pagination]}
      className="mySwiper"
    >
      {books.data.map((book) => (
        <SwiperSlide key={book.id}>
          {" "}
          <div className="sm:block md:flex justify-between p-8">
            <Flex
              direction={"column"}
              gapY={"4"}
              justify={"start"}
              className="w-64"
            >
              <div className="text-start">
                <Text size={"5"} color="violet" weight={"medium"}>
                  {book.title}
                </Text>
              </div>
              <Text size={"4"} className="text-zinc-950 text-start">
                {book.author}
              </Text>
              <Text size={"3"} className="text-zinc-800 w-1/2 text-start">
                {book.category?.name}
              </Text>
              <div className="text-start">
                {" "}
                <Button
                  onClick={() => router.push(`/dashboard/product/${book.id}`)}
                  variant="solid"
                  size={"3"}
                >
                  View his boooks
                </Button>
              </div>
            </Flex>
            <Flex>
              <Image
                src={"https://svu-pr1.somar-kesen.com" + book.image}
                alt="..."
                width={"323"}
                height={"452"}
                className="rounded-md"
              />
            </Flex>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
