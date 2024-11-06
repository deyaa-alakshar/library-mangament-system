import React from "react";
import { SlBasket } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

const NavbarIcons = () => {
  return (
    <ul className="md:flex justify-between ms-auto gap-4">
      <li className="p-2">
        <SlBasket color="#937DC299" />
      </li>
      <li className="md:border-r-2 md:border-l-2 border-solid border-r-#937DC299 border-l-#937DC299 p-2">
        <FaHeart color="#937DC299" />
      </li>
      <li className="p-2">
        <IoPersonSharp color="#937DC299" />
      </li>
    </ul>
  );
};

export default NavbarIcons;
