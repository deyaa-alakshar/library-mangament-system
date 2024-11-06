import React from "react";
import AddBookForm from "./addBookForm";
import { cookies } from "next/headers";
import axios from "axios";

const cookie = cookies();
const userInfo = JSON.parse(cookie.get("userInfo")?.value!);

const fetchCategory = async () =>
  await axios.get(`${process.env.NEXT_PUBLIC_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${userInfo.access_token}`,
    },
  });

const Add = async () => {
  const categories = await fetchCategory();
  return (
    <div className="flex-grow">
      <AddBookForm categories={categories.data.data} />
    </div>
  );
};

export default Add;
