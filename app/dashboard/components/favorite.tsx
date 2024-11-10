import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Book } from "./books";

const Favorite = ({
  book,
  favorites,
  handleAddToFavorite,
  handleRemoveToFavorite,
}: {
  book: Book;
  favorites: Book[];
  handleRemoveToFavorite: (book: Book) => void;
  handleAddToFavorite: (book: Book) => void;
}) => {
  if (favorites.some((favorite) => favorite.id === book.id)) {
    return (
      <FaHeart
        onClick={() => handleRemoveToFavorite(book)}
        className="cursor-pointer"
        color="#937DC2"
        size={"25"}
      />
    );
  } else {
    return (
      <FaRegHeart
        onClick={() => handleAddToFavorite(book)}
        className="cursor-pointer"
        color="#937DC2"
        size={"25"}
      />
    );
  }
};

export default Favorite;
