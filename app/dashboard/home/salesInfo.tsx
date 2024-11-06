import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { Flex, Text } from "@radix-ui/themes";

const SalesInfo = () => {
  return (
    <Flex my={"8"} justify={"between"}>
      <div>
        <Flex gap={"3"} align={"center"}>
          <MdOutlineLocalShipping size={"35"} />{" "}
          <Text size={"5"} className="text-zinc-900 font-medium">
            Free shiping over 50${" "}
          </Text>{" "}
        </Flex>
      </div>
      <div>
        <Flex gap={"3"} align={"center"}>
          <IoStarSharp size={"35"} />{" "}
          <Text size={"5"} className="text-zinc-900 font-medium">
            Save with loyalty points
          </Text>{" "}
        </Flex>
      </div>
      <div>
        <Flex gap={"3"} align={"center"}>
          <FaBookOpen size={"35"} />{" "}
          <Text size={"5"} className="text-zinc-900 font-medium">
            Read a few pages
          </Text>{" "}
        </Flex>
      </div>
    </Flex>
  );
};

export default SalesInfo;
