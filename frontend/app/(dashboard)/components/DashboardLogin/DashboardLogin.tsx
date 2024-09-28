"use client";
import { getUserData } from "@/lib/getUserData/getUserData";
import { User } from "@/types";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import MarkunreadRoundedIcon from "@mui/icons-material/MarkunreadRounded";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthenticated = false; // Replace with actual authentication check

  if (!isAuthenticated && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default function DashboardLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname().split("/")[1];

  if (error) {
    return null; // Render nothing if there's an error
  }

  const validateInputs = () => {
    if (!email || !password) {
      setIsError(true);
      setErrorMessage("Email and password are required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      const data = await dispatch<User | any>(
        getUserData({
          email,
          password,
          setIsError,
          setIsLoading,
          setErrorMessage,
        })
      );
      console.log(data);
      if (!data?.admin) {
        setIsError(true);
        setErrorMessage("Invalid credentials");
        return;
      }
      router.push(`${pathName}/admin_${data?.admin._id}`);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage("Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <Modal isOpen={true} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                endContent={
                  <MarkunreadRoundedIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                endContent={
                  <LockOpenRoundedIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Password"
                placeholder="Enter your password"
                type="password"
                variant="bordered"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex py-2 px-1 justify-between">
                {isError && (
                  <p className="text-red-500 text-xs">{errorMessage}</p>
                )}
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleLogin}>
                {isLoading ? <Loader /> : "Sign in"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
