import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  KeyRoundIcon,
  LockIcon,
  PackagePlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react";

const MainNavBar = (): JSX.Element => {
  const session = true;
  const isAuthenticated = true;
  //   const isAuthenticated = status === "authenticated" && session;
  return (
    <>
      <nav className="hidden lg:block">
        <ul className="flex justify-around items-center">
          {!isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/login"}>
                Login <KeyRoundIcon className="ml-4" />
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/auth/signup"}>
                SignUp <LockIcon className="ml-4" />
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/orders"}>
                Orders <ShoppingBagIcon className="ml-4" />
              </Link>
            </li>
          )}
          {
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/products"}>
                {isAuthenticated ? " Shop Here" : "View Products"}
                <StoreIcon className="ml-4" />
              </Link>
            </li>
          }
          {isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/cart"}>
                View Cart <ShoppingCartIcon className="ml-4" />
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="nav-btn">
              <Link className="nav-btn-link" href={"/products/add-product"}>
                Add product
                <PackagePlusIcon className="ml-4" />
              </Link>
            </li>
          )}
          {isAuthenticated && <li className="nav-btn"></li>}
        </ul>
      </nav>
    </>
  );
};

export default MainNavBar;
