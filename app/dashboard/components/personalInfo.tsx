import { DropdownMenu, IconButton, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { IoPerson } from "react-icons/io5";
import Cookies from "js-cookie";

const PersonalInfo = () => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("userInfo");
    router.push("/");
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" color="gray">
          <IoPerson color="#937DC299" size={"25"} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <Text
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/profile")}
          >
            Profile
          </Text>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Text className="cursor-pointer" onClick={handleLogout}>
            Log out
          </Text>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default PersonalInfo;
