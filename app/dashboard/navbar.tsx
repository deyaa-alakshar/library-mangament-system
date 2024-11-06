import Image from "next/image";
import React, { cache } from "react";
import Logo from "../public/Logo.png";
import { Box, Button, Container, Flex, Grid, Text } from "@radix-ui/themes";
import Search from "./components/search";
import NavbarList from "./components/navbarList";
import NavbarIcons from "./components/navbarIcons";
import { FaPhone } from "react-icons/fa6";
import axios from "axios";
import { cookies } from "next/headers";

interface category {
  id: number;
  name: string;
  is_active: boolean;
}
const cookie = cookies();
const userInfo = JSON.parse(cookie.get("userInfo")?.value!);

const fetchCategory = cache(() =>
  axios.get(`${process.env.NEXT_PUBLIC_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${userInfo.access_token}`,
    },
  })
);
const Navbar = async () => {
  const categories = fetchCategory();

  return (
    <>
      <Box className="border-b border-solid border-b-#937DC2">
        <Container>
          <nav className="flex items-center justify-between flex-wrap p-2">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <Flex gapX={"2"} justify={"between"} align={"center"}>
                <Image
                  src={Logo}
                  alt="logo"
                  width="75"
                  height="25"
                  className="border-r-2 border-solid  border-r-#937DC299 pr-2"
                />
                <Text size={"1"} className="text-zinc-400">
                  We love books
                </Text>
              </Flex>
            </div>
            <div className="block lg:hidden">
              <button className="flex items-center px-3 py-2 border rounded text-zinc-800 border-zinc-900 hover:text-black hover:border-black">
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
                {" "}
                <div className="md:flex my-3 gap-x-8">
                  <Search />
                  <NavbarList />
                  <NavbarIcons />
                </div>
              </div>
            </div>
          </nav>
        </Container>
      </Box>

      <nav className="border-b-2 border-solid border-#937DC299 p-2">
        <Container>
          <Grid columns={{ initial: "1", md: "2" }} align="center" gap="2">
            <Box>
              <ul className="sm:block md:flex justify-start gap-3 items-center">
                {[].map((element) => (
                  <li className="py-2 md:py-0">
                    <Text size="2" className="text-zinc-500">
                      {element}
                    </Text>
                  </li>
                ))}
              </ul>
            </Box>
            <Box>
              <ul className="sm:block md:flex justify-end gap-4">
                <li className="flex justify-start items-center gap-2 py-2 md:py-0">
                  <FaPhone color="#937DC299" />{" "}
                  <Text size={"2"} className="text-zinc-500">
                    +445 87 999 000
                  </Text>
                </li>
                <li className="py-2 md:py-0">
                  <Button size={"3"} variant="outline">
                    Request a call
                  </Button>
                </li>
              </ul>
            </Box>
          </Grid>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
