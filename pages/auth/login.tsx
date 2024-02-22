import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Toaster, toast } from "sonner";
import { LoginSchema, LoginSchemaType, SignUpSchemaType } from "@/schemas/user";
import FormErrorMsg from "@/components/form/FormErrorMsg";
import Loading from "@/components/ui/Loading";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { app } from "@/lib/firebase/init";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [hidePwd, setHidePwd] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>();

  async function onSubmit(data: LoginSchemaType) {
    if (LoginSchema.safeParse(data).success) {
      try {
        const auth = getAuth(app);

        const fbResp = await signInWithEmailAndPassword(
          auth,
          data.userEmail,
          data.userPwd
        );
        console.log(fbResp);
      } catch (error) {
        console.log(error);
        if (error instanceof FirebaseError) {
          toast.warning("Something went wrong", {
            description: "Wrong email or password",
          });
        }
      }
    } else {
      toast.warning("Invalid credentials", {
        description: "Please try again later",
      });
    }
  }
  return (
    <>
      <Head>
        <title>V-Space | Login page</title>
      </Head>
      <h1 className="mt-8 text-slate-500 text-center font-bold text-5xl">
        Log In here
      </h1>
      <form
        noValidate
        className="flex flex-col mt-8 mx-auto p-2 w-11/12 md:w-10/12 md:px-4 lg:w-4/6 xl:w-3/6 2xl:w-2/5 sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded-md shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form-label" htmlFor="userEmail">
          Enter email
        </label>
        <FormErrorMsg erMsg={errors.userEmail?.message} />
        <input
          {...register(
            "userEmail",

            {
              required: { value: true, message: "Your name is required" },
              minLength: {
                value: 5,
                message: "Your name cant must be at least 5 characters",
              },
            }
          )}
          id="userEmail"
          className="form-input"
          type="email"
        />
        <label className="form-label" htmlFor="userPwd">
          Enter password
        </label>
        <FormErrorMsg erMsg={errors.userPwd?.message} />
        <div className="relative flex items-center">
          <input
            {...register("userPwd", {
              required: {
                value: true,
                message: "Please enter your password",
              },
              minLength: {
                value: 6,
                message: "Password must be greater than 6 characters",
              },
            })}
            id="userPwd"
            className="form-input m-0 w-full"
            type={hidePwd ? "password" : "text"}
          />
          <button
            className="m-0 p-0 absolute right-4"
            type="button"
            onClick={() => {
              setHidePwd((prev) => {
                return !prev;
              });
            }}
          >
            {hidePwd ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn("btn2 mt-4", {
            "py-0": isSubmitting,
          })}
        >
          {isSubmitting ? (
            <Loading className="bg-white" />
          ) : (
            <span>Log In</span>
          )}
        </button>
      </form>
      <Toaster richColors closeButton theme="light" />
    </>
  );
}
