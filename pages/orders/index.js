import { useState, useEffect } from "react";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image'
import Orders from '../../components/Orders';
import axios from "axios";

function OrderPage(props) {
  const { orders } = props;
  const router = useRouter();
  var i = 0;
  const statusArray = ['CREATED', 'PROCESSING', 'FULFILLED', 'CANCELED'];
  setInterval(function() {
    axios.get('http://localhost:3001/api/change_order_status/de534cc5-7b3d-4c41-ad12-2c57b3123673/'+statusArray[i%4])
        .then(response => console.log('changed status into ', statusArray[i%4]));
        i++;
    }, 10000);

  if (!router.isFallback && !orders) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="my-8 bg-primary">
      <Head>
        <title>All orders</title>
        <meta
          name="GIU SE"
          content="all orders"
        />
      </Head>
      <div className="mt-4">
        <Orders orders={orders} />
      </div>
    </div>
  );
}

export async function getStaticProps({ params = {} }) {
  const response = await fetch('http://localhost:3001/api/orders');
  const data = await response.text()
  const orders = JSON.parse(data);
  console.log(orders);
  return {
    props: {
      orders,
    },
  };
}

export default OrderPage;