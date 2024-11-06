import React from "react";
import SideNav from "./sideNav";
import { Flex } from "@radix-ui/themes";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Flex gapX={"6"}>
      <SideNav />
      {children}
    </Flex>
  );
};

export default Layout;
