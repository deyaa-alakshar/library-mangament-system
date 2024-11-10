"use client";
import { Container, Grid } from "@radix-ui/themes";
import React, { useCallback, useEffect, useState } from "react";
import Card from "../components/card";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface Book {
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

const Favorites = () => {
  const [favorites, setfavorites] = useState<Book[] | []>([]);

  useEffect(() => {
    const favorites = Cookies.get("favorites")
      ? (JSON.parse(Cookies.get("favorites")!) as Book[])
      : [];

    setfavorites(favorites);
  }, []);

  const handleAddToFavorite = useCallback(
    (book: Book) => {
      if (Cookies.get("favorites")) {
        Cookies.set("favorites", JSON.stringify([...favorites, book]));
        setfavorites([...favorites, book]);
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

      toast.success("Successfully removied from favorites", {
        position: "bottom-left",
      });
    },
    [favorites]
  );

  return (
    <Container>
      <Grid columns={{ initial: "2", md: "4" }} gapX={"8"} my={"8"}>
        {favorites.map((favorite) => (
          <Card
            book={favorite}
            favorites={favorites}
            handleAddToFavorite={handleAddToFavorite}
            handleRemoveToFavorite={handleRemoveToFavorite}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
