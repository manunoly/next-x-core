"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserButton } from "@/components/auth/user-button";
import { usePathname } from "next/navigation";
import { getMenu } from "@/actions/menu";
import { Menu } from "@prisma/client";

export const Navbar = () => {
  const pathname = usePathname();
  const [nav, setNav] = useState(false);
  const [menuLinks, setMenuLinks] = useState([{ id: 1, link: "home", title: "Home" }]);

  async function loadMenu() {
    getMenu().then((data: Menu | null) => {
      if (data && data.menu) {
        setMenuLinks(JSON.parse(data.menu));
      }
    }).catch((error) => {
      console.log('error', error);
    });
  }

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white fixed nav top-0 z-50">
      <div>
        <h1 className="text-5xl font-signature ml-2">
          <Link href="/">
            <Image src="/logo.svg" width={40} height={40} alt="X-Core" />
          </Link>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {menuLinks.map(({ id, link, title }) => (
          <li
            key={id}
            className={pathname === `/${link}` ? "nav-links px-4 cursor-pointer capitalize font-medium text-white" : "nav-links px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 hover:text-blue duration-200 link-underline"}
          >
            <Link href={link}>{title}</Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:flex">
        <UserButton />
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-black-500 md:hidden top-0 right-0"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b ">
          {menuLinks.map(({ id, link, title }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
