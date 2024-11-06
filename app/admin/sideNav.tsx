"use client";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import React, { useState } from "react";
import { FaBook, FaFolderOpen, FaUsers } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import logo from "../public/Logo.png";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  return (
    <Sidebar className="h-screen" collapsed={collapsed}>
      <Menu>
        <MenuItem
          onClick={() => setCollapsed((e) => !e)}
          icon={<IoMenuSharp />}
        >
          <Image src={logo} alt="logo" />
        </MenuItem>

        <SubMenu title="Books" label="Books" icon={<IoLibrarySharp />}>
          <MenuItem
            icon={<FaBook />}
            onClick={() => router.push("/admin/books/current")}
          >
            Current
          </MenuItem>
          <MenuItem
            icon={<RiArchiveDrawerLine />}
            onClick={() => router.push("/admin/books/archived")}
          >
            Archived
          </MenuItem>
          <MenuItem
            icon={<CiBookmarkCheck />}
            onClick={() => router.push("/admin/books/reserved")}
          >
            Books reserved
          </MenuItem>
        </SubMenu>

        <SubMenu title="Users" label="Users" icon={<FaUsersCog />}>
          <MenuItem
            icon={<FaUsers />}
            onClick={() => router.push("/admin/users/current")}
          >
            Current
          </MenuItem>
          <MenuItem
            icon={<RiArchiveDrawerLine />}
            onClick={() => router.push("/admin/users/archived")}
          >
            Archived
          </MenuItem>
        </SubMenu>

        <SubMenu title="Categories" label="Categories" icon={<FaFolderOpen />}>
          <MenuItem
            icon={<BiSolidCategoryAlt />}
            onClick={() => router.push("/admin/category/current")}
          >
            Current
          </MenuItem>
          <MenuItem
            icon={<RiArchiveDrawerLine />}
            onClick={() => router.push("/admin/category/archived")}
          >
            Archived
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<IoIosLogOut />}
          onClick={() => {
            Cookies.remove("userInfo");
            router.refresh()
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideNav;
