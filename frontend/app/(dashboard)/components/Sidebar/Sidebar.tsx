"use client";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddModeratorRoundedIcon from "@mui/icons-material/AddModeratorRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
const SidebarMenu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <DashboardRoundedIcon />,
  },
  {
    name: "Products",
    href: "/products",
    icon: <CategoryRoundedIcon />,
    content: [
      "Products",
      "Categories",
      "Brands",
      "Tags",
      "Attributes",
      "Variants",
    ],
  },
  {
    name: "Orders",
    href: "/orders",
    icon: <LocalAtmRoundedIcon />,
    content: ["Orders", "Invoices", "Shipments"],
  },
  {
    name: "Customers",
    href: "/customers",
    icon: <AccountCircleRoundedIcon />,
    content: ["Customers", "Groups", "Subscribers"],
  },
  {
    name: "Marketing",
    href: "/marketing",
    icon: <LocalOfferRoundedIcon />,
    content: ["Promotions", "Campaigns", "Coupons", "Discounts"],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: <StickyNote2RoundedIcon />,
    content: ["Sales", "Orders", "Customers", "Products"],
  },
  {
    name: "New Admin",
    href: "/new-admin",
    icon: <AddModeratorRoundedIcon />,
    content: ["Admins", "Roles", "Permissions"],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <SettingsRoundedIcon />,
    content: ["General", "Store", "Payments", "Shipping"],
  },
];

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathName = usePathname();

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null); // Close if the same menu is clicked
    } else {
      setActiveDropdown(name); // Open the clicked menu
    }
  };

  return (
    <>
      <aside className="bg-[#e7e7e7b7] shadow-md shadow-[#080e2091] min-w-72 w-full h-full">
        <Image alt="Logo" height={200} width={300} src="/logo.svg" />
        <nav className="border-t-2 border-gray-300">
          <ul className="flex flex-col justify-center items-start pl-5 pr-10 pt-5">
            {SidebarMenu.map((menu) => (
              <React.Fragment key={menu.name}>
                <li className="py-2">
                  <button
                    className={`flex items-center gap-2 hover:text-black hover:bg-black/20 hover:border-l-3 border-[#cb3cff] px-4 py-2 w-full ${
                      activeDropdown === menu.name
                        ? "text-[#cb3cff]"
                        : "text-black"
                    }`}
                    onClick={() => {
                      menu.content ? toggleDropdown(menu.name) : null;
                    }}
                  >
                    {menu.icon}
                    {menu.name}
                  </button>
                </li>
                <div className="flex flex-col justify-start items-start gap-2">
                  {activeDropdown === menu.name &&
                    menu?.content?.map((item, index) => (
                      <li key={index} className="p-2 px-4">
                        {" "}
                        {/* Ensure key is used here */}
                        <a
                          className="hover:text-black hover:bg-black/20 hover:border-l-3 border-[#cb3cff] px-4 py-2 w-full text-black"
                          href={`${pathName}/${item.toLowerCase()}`}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                </div>
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
