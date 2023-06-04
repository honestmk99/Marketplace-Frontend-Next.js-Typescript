import { useState } from "react";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image'
import Shipments from '../../components/Shipments';

function ShipmentPage(props) {
  const { shipments } = props;
  const router = useRouter();

  if (!router.isFallback && !shipments) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="my-8 bg-primary">
      <Head>
        <title>All shipments</title>
        <meta
          name="GIU SE"
          content="all shipments"
        />
      </Head>
      <div className="mt-4">
        <Shipments shipments={shipments} />
      </div>
    </div>
  );
}

export async function getStaticProps({ params = {} }) {
  const response = await fetch('http://localhost:3001/api/shipments');
  const data = await response.text()
  const shipments = JSON.parse(data);
  return {
    props: {
      shipments,
    },
  };
}

export default ShipmentPage;