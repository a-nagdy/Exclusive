"use client";

import userSelector from "@/lib/userSelector";
import { User } from "@/types";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const user = userSelector();

  useEffect(() => {
    setCurrentUser(user);
  }, []);

  // Show a loading state while checking authentication
  if (currentUser === null) {
    return <Loader />;
  }

  // Redirecting immediately if not authenticated
  if (!currentUser) {
    return null; // Render nothing while redirecting
  }

  return (
    <section className="flex gap-5 w-full h-full overflow-x-hidden break-words bg-[#e7e7e7]">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col gap-10 w-full overflow-x-hidden">
        <DashboardNavbar admin={currentUser} />
        {children}
      </div>
    </section>
  );
}
