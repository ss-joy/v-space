import MainHeader from "@/components/MainHeader";
import AuthContextProvider from "@/context/auth-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>V-space</title>
      </Head>
      <AuthContextProvider>
        <MainHeader />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
