import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  KeyRoundIcon,
  LockIcon,
  PackagePlusIcon,
  PenIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
  TelescopeIcon,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import HamburgerSlider from "./drawer/HamBurgerSlider";
import Profile from "./profile/Profile";
import { signOut } from "firebase/auth";

const MainNavBar = (): JSX.Element => {
  const { userId, userIsAuthenticated } = useAuth();

  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex justify-around items-center">
          {userIsAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/events"}>
                Browse Events <TelescopeIcon className="ml-4" />
              </Link>
            </li>
          )}
          {!userIsAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/login"}>
                Login <KeyRoundIcon className="ml-4" />
              </Link>
            </li>
          )}
          {!userIsAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/signup"}>
                SignUp <LockIcon className="ml-4" />
              </Link>
            </li>
          )}

          {userIsAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/events/create"}>
                Create Event <PenIcon className="ml-4" />
              </Link>
            </li>
          )}

          {userIsAuthenticated && (
            <li className="nav-btn">
              <Profile userId={userId} signOut={signOut} />
            </li>
          )}
        </ul>
      </nav>
      <HamburgerSlider />
    </>
  );
};

export default MainNavBar;
