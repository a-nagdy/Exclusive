"use client";
import userSelector from "@/lib/userSelector";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const currentUser = userSelector();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col gap-10 w-full overflow-x-hidden">test</div>
  );
};


export default Dashboard;
