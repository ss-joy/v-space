import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/init";
function HamburgerSlider() {
  const { userIsAuthenticated, userId } = useAuth();
  const router = useRouter();
  function logOut() {
    signOut(auth).then((data) => console.log(data));
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="p-0 outline-none border-none  min-[1024px]:hidden"
          >
            <div className="w-full">
              <hr className="bg-black w-10 h-1 my-2 rounded" />
              <hr className="bg-black w-10 h-1 my-2 rounded" />
              <hr className="bg-black w-10 h-1 my-2 rounded" />
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-slate-500 text-2xl pt-3">
              Welcome to webuy
            </SheetTitle>
          </SheetHeader>
          <nav className={""}>
            <ul className="flex flex-col items-end pt-20">
              {
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/events"}>Browse Events</Link>
                </li>
              }
              {!userIsAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/auth/login"}>Login</Link>
                </li>
              )}
              {!userIsAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/auth/signup"}>SignUp</Link>
                </li>
              )}
              {router.pathname !== "/products" && userIsAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={"/events/create"}>Create Event</Link>
                </li>
              )}

              {userIsAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <button onClick={logOut}>Log Out</button>
                </li>
              )}
              {userIsAuthenticated && (
                <li className={cn("nav-btn my-2", "hover:text-orange-300")}>
                  <Link href={`/user/profile/${userId}`}>Profile</Link>
                </li>
              )}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HamburgerSlider;
