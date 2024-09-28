import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Address = {
  city: string;
  state: string;
  zip: string;
  country: string;
  _id: string;
}

export type User = {
  _id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  avatar: string;
  address: Address[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  userToken: string;
}

