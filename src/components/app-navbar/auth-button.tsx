"use client";

import {
  Avatar,
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

import GoogleIcon from "../google-icon";

export default function AuthButton({ minimal = true }: { minimal?: boolean }) {
  const { data, status } = useSession();

  if (status === "loading") {
    return <CircularProgress />;
  }

  const handleSignOut = () => signOut({ callbackUrl: "/" });

  if (status === "authenticated") {
    if (minimal) {
      return (
        <Button onClick={handleSignOut} color="danger" variant="ghost">
          <GoogleIcon /> Sign Out
        </Button>
      );
    }
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            showFallback={!data.user?.image}
            src={data.user?.image || ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{data.user?.email}</p>
          </DropdownItem>

          <DropdownItem key="sign-out" color="danger" onClick={handleSignOut}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: "/profile" })}
      color="danger"
      variant="ghost"
    >
      <GoogleIcon /> Sign In
    </Button>
  );
}
