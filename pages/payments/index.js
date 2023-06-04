import { useState } from "react";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image'

function PaymentPage(props) {
  const { products } = props;
  const router = useRouter();

  if (!router.isFallback && !products) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="my-8 bg-primary">
      <Head>
        <title>GIU SE Marketplace Example</title>
        <meta
          name="GIU SE"
          content="Rabbit Mart Marketp"
        />
      </Head>
    </div>
  );
}

export default PaymentPage;