import { Box, Button, Container, Flex, Grid, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import logo from "../public/Logo.png";
import { FaPhoneAlt } from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import paypal from "../public/paipal 1.png";
import masterCard from "../public/MasterCard-Logo-1979 1.png";
import visaCard from "../public/VISA-card-logo- 1.png";

const Categories = [
  "Categories",
  "Psychology",
  "Self-Help",
  "Romance",
  "Mystery",
];
const forKids = ["For kids", "Games", "Comics", "Romance", "Mystery"];
const eBooks = ["E-Books", "Fiction", "Historical", "Horror "];

const Footer = () => {
  return (
    <Box className="py-5" style={{ backgroundColor: "#937DC2" }}>
      <Container>
        <Grid className="sm:text-center md:text-left sm:p-2" columns={{ initial: "3", md: "6" }}>
          <Box>
            {" "}
            <Image
              className="mt-3"
              src={logo}
              alt="logo"
              width="75"
              height="25"
            />
          </Box>
          <Box>
            <ul>
              {Categories.map((element, index) => (
                <li className="my-3">
                  {" "}
                  <Text
                    size={"3"}
                    className={index === 0 ? "text-zinc-50" : "text-zinc-300"}
                  >
                    {element}
                  </Text>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <ul>
              {forKids.map((element, index) => (
                <li className="my-3">
                  {" "}
                  <Text
                    size={"3"}
                    className={index === 0 ? "text-zinc-50" : "text-zinc-300"}
                  >
                    {element}
                  </Text>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <ul>
              {eBooks.map((element, index) => (
                <li className="my-3">
                  {" "}
                  <Text
                    size={"3"}
                    className={index === 0 ? "text-zinc-50" : "text-zinc-300"}
                  >
                    {element}
                  </Text>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <ul>
              <li className="my-3">
                <Text size={"3"} className="text-zinc-50">
                  Help & Contacts{" "}
                </Text>
              </li>
              <li className="my-3 flex justify-start items-center gap-2">
                <FaPhoneAlt color="#fff" />{" "}
                <Text size={"2"} className="text-zinc-50">
                  +445 87 999 000
                </Text>
              </li>
              <li className="my-3 flex justify-start items-center gap-2">
                <CiClock1 color="#fff" />{" "}
                <Text size={"2"} className="text-zinc-50">
                  Mo-Fri, 9 AM to 11 PM
                </Text>
              </li>
              <li className="my-3 flex justify-start items-center gap-2">
                <CiMail color="#fff" />{" "}
                <Text size={"2"} className="text-zinc-50">
                  b.world@store.ro
                </Text>
              </li>
            </ul>
          </Box>
          <Box className="text-center">
            <ul>
              <li className="my-3">
                {" "}
                <Text size="3" className="text-zinc-50">
                  If you have questions, you can contact us or we will do it for
                  you.{" "}
                </Text>
              </li>
              <li className="my-3">
                {" "}
                <Button size="3" variant="outline" color="gray" highContrast>
                  Request a call
                </Button>
              </li>
            </ul>
          </Box>
        </Grid>
        <div className="sm:block md:flex justify-between sm:p-2">
          <div className="flex gap-3">
            <FaFacebookSquare size={"25"} color="#fff" />
            <FaInstagramSquare size={"25"} color="#fff" />
            <RiTwitterXFill size={"25"} color="#fff" />
          </div>
          <div className="sm:block md:flex justify-between gap-3">
            <Image src={paypal} alt="paypal logo" />
            <Image src={masterCard} alt="master card logo" />
            <Image src={visaCard} alt="visa card logo" />
          </div>
        </div>
      </Container>
      <div className="border-b-2 border-b-solid border-#fff my-4"></div>
    </Box>
  );
};

export default Footer;
