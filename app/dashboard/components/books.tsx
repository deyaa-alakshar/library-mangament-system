"use client";
import React, { cache, useCallback, useEffect, useState } from "react";
import Card from "./card";
import axios from "axios";
import { Books as BooksShape } from "@/app/util/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

const fetchBooks = async (page: number) => {
  const userInfo = JSON.parse(Cookies.get("userInfo")!);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/active-books?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    }
  );
  return response;
};

const Books = ({ page }: { page: number }) => {
  const [favorites, setfavorites] = useState<Book[] | []>([]);
  const router = useRouter()


  const { data, isLoading, refetch } = useQuery<{ data: BooksShape }, Error>({
    queryKey: ["books", page],
    queryFn: () => fetchBooks(page),
  });

  const handleAddToFavorite = useCallback(
    (book: Book) => {
      if (Cookies.get("favorites")) {
        Cookies.set("favorites", JSON.stringify([...favorites, book]));
        setfavorites([...favorites, book]);
        router.refresh();
      } else {
        const favorites = [] as Book[] | [];
        Cookies.set("favorites", JSON.stringify([book]));
        setfavorites(favorites);
      }

      toast.success("Successfully added to favorites", {
        position: "bottom-left",
      });
    },
    [favorites]
  );

  const handleRemoveToFavorite = useCallback(
    (book: Book) => {
      Cookies.set(
        "favorites",
        JSON.stringify(favorites.filter((favorite) => favorite.id !== book.id))
      );
      setfavorites(favorites.filter((favorite) => favorite.id !== book.id));
      router.refresh();

      toast.success("Successfully removied from favorites", {
        position: "bottom-left",
      });
    },
    [favorites]
  );

  useEffect(() => {
    const favorites = Cookies.get("favorites")
      ? (JSON.parse(Cookies.get("favorites")!) as Book[])
      : [];

    setfavorites(favorites);
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      pagination={{
        type: "bullets",
      }}
      navigation={true}
      modules={[Pagination]}
      className="mySwiper mb-10"
    >
      {" "}
      {data?.data.data?.map((book, index) => (
        <SwiperSlide key={index}>
          <Card
            book={book}
            favorites={favorites}
            handleRemoveToFavorite={handleRemoveToFavorite}
            handleAddToFavorite={handleAddToFavorite}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Books;
