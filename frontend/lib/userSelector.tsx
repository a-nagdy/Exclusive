"use client";

import { selectUser } from "@/app/store/slices/userSlice";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const userSelector = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => selectUser(state));
  return user;
};
export default userSelector;
