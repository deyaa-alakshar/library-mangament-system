"use client";
import React, { useEffect, useState } from "react";
import PersonalInfo from "./personalInfo";
import Basket from "./basket";
import Favorites from "./favorites";
import Cookies from "js-cookie";

const NavbarIcons = () => {

  const [cartLength, setCartLength] = useState<number>(0); 
  const [basketLength, setBasketLength] = useState<number>(0); 

  useEffect(() =>{

    Cookies.get("favorites") ? setBasketLength(JSON.parse(Cookies.get("favorites")!).length) : setBasketLength(0)
    Cookies.get("cart") ? setCartLength(JSON.parse(Cookies.get("cart")!).length) : setCartLength(0)

  },[Cookies.get("favorites")?.length, Cookies.get("cart")?.length])

  return (
    <ul className="md:flex justify-between ms-auto gap-4">
      <li className="p-2">
        {/* <SlBasket
          onClick={() => router.push("/dashboard/cart")}
          size={"25"}
          color="#937DC299"
          className="cursor-pointer"
        /> */}
        <Basket count={cartLength} />
      </li>
      <li className="md:border-r-2 md:border-l-2 border-solid border-r-#937DC299 border-l-#937DC299 p-2 cursor-pointer">
        <Favorites count={basketLength} />
      </li>
      <li className="p-2">
        <PersonalInfo />
      </li>
    </ul>
  );
};

export default NavbarIcons;
