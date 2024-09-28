"use client";
import { logOutUser } from "@/app/store/slices/userSlice";
import { AppDispatch } from "@/app/store/store";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";

import { User as UserType } from "@/types";
import { usePathname, useRouter } from "next/navigation";

const DashboardNavbar = ({ admin }: { admin: { admin: UserType } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();
  const router = useRouter();
  console.log(pathName);
  // Utility function to get the title based on the path
  const getTitleFromPath = (pathName: string): string | undefined => {
    const match = pathName.match(/\/[^/]+\/admin_/);
    if (match && match.index !== undefined) {
      const parts = pathName.slice(match.index + match[0].length).split("/");
      console.log(parts, "parts");
      return parts[1] || "Dashboard"; // Return the segment after the admin ID or "Dashboard" if not present
    }
    return undefined; // Add a return statement for cases where the condition is not met
  };
  const handleLogout = () => {
    dispatch(logOutUser());
    router.push("/");
  };

  return (
    <div className="flex justify-between items-center gap-4 p-10 text-black">
      <h1 className="capitalize text-black text-2xl font-bold">
        {getTitleFromPath(pathName)}
      </h1>
      <Dropdown placement="left-start" backdrop="blur">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description={`@${admin?.admin.firstName + admin?.admin.lastName}`}
            name={`${admin?.admin.firstName} ${admin?.admin.lastName}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            key="profile"
            textValue="Profile"
            className="h-14 gap-2"
          >
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">
              @{admin?.admin.firstName + admin?.admin.lastName}
            </p>
          </DropdownItem>
          <DropdownItem key="settings" textValue="Settings">
            My Settings
          </DropdownItem>
          {/* <DropdownItem key="team_settings" textValue="team_settings" >Team Settings</DropdownItem>
          <DropdownItem key="analytics" >Analytics</DropdownItem> */}
          {/* <DropdownItem key="system">System</DropdownItem> */}
          {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
          <DropdownItem key="help_and_feedback" textValue="Help">
            Help & Feedback
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            textValue="Logout"
            onClick={handleLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DashboardNavbar;
