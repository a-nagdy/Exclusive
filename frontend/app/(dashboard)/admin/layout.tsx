import StoreProvider from "@/app/storeProvider";
import React from "react";

const DashboardLoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
    </>
  );
};

export default DashboardLoginLayout;
