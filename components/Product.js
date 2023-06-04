import { useState, useRef } from "react";
import * as axios from 'axios';
import { useRouter } from "next/router";

function Product(props) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [orderId, setOrderId] = useState('');
  const router = useRouter();
  const {
    id,
    name,
    size,
    image,
    slug,
    price,
    stock,
    category,
    measurement,
    weight,
  } = props;

  const handleNewOrder = async (e) => {
    if (email == '') {
      setEmailEmpty(true);
    } else {
      setEmailEmpty(false);
    }
    if (!emailEmpty) {
      // Check Card Status
      const { data } = await axios.default.post('http://localhost:3001/api/check_card', {
        card: card,
        exp_month: month,
        exp_year: year,
        cvc: cvc
      });
      if (data) {
        // Create Payment
        const { data } = await axios.default.post('http://localhost:3001/api/payments', {
          name,
          price
        });
        if (data) {
          console.log('payment result', data);
          if (data.paid) {
            // If payment successful, create order
            const { data } = await axios.default.post('http://localhost:3001/api/orders', {
              name,
              price,
            });
            var orderResult = data;
            if (data) {
              // If order created successfully, decrease product stock
              console.log(orderResult);
              setOrderId(orderResult.id);
              const { data } = await axios.default.post('http://localhost:3001/api/decrement_products/'+id);
              console.log('decrement_products result', data);
              if (data == 'success') {
                // Then create shipment
                const { data } = await axios.default.post('http://localhost:3001/api/shipments', {
                  name: name,
                  price: price,
                  order_id: orderResult.id
                });

                console.log('create shipment result', data);
                if (data.id) {
                  // After shipment created, send email to user.
                  const { data } = await axios.default.post('http://localhost:3001/api/send_email/'+orderResult.id+'/'+email);
                  console.log('email result', data);
                  // setMessage(`Success! Your order number is: ${orderId}`);
                }
              }
            }
          }
        }
      }
    }
    // const { data } = await axios.default.post('http://localhost:3001/api/orders', {
    //   name,
    //   price,
    // });
    // if (data) {
    //   setMessage(`Success! Your order number is: ${data.id}`);
    // }
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const cardChanged = (e) => {
    setCard(e.target.value);
  };

  const monthChanged = (e) => {
    setMonth(e.target.value);
  };

  const yearChanged = (e) => {
    setYear(e.target.value);
  };

  const cvcChanged = (e) => {
    setCvc(e.target.value);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96 ">
          <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={image} alt="" />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2 lg:py-12">
          <h3 className="text-3xl leading-7 mb-2 font-bold uppercase lg:text-5xl">
            {name}
          </h3>
          <span className="text-2xl leading-7 font-bold mt-3">
            ${price}
          </span>
          <div className="mt-12">
            <span className="text-2xl leading-7 font-bold mt-3">
              Email address
            </span>
            <br/>
            <input className="mt-3" name="email" type="email" onChange={(e) => emailChanged(e)} style={{fontSize: '25px', width: '100%'}}/>
            {
              emailEmpty ? <span className="text-sm leading-7 font-bold mt-3" style={{color: 'red'}}>
                Input your email address
              </span> :
              <></>
            }            
          </div>
          <div className="mt-12">
            <span className="text-2xl leading-7 font-bold mt-3">
              Card Information
            </span>
            <br/>
            <input className="mt-3" name="card_number" type="text" onChange={(e) => cardChanged(e)} style={{fontSize: '25px', width: '100%'}} placeholder="Card Number"/>
            <br/>
            <input className="mt-3" name="exp_month" type="text" onChange={(e) => monthChanged(e)} style={{fontSize: '25px', width: '100%'}} placeholder="Expire Month"/>
            <br/>
            <input className="mt-3" name="exp_year" type="text" onChange={(e) => yearChanged(e)} style={{fontSize: '25px', width: '100%'}} placeholder="Expire Year"/>   
            <br/>
            <input className="mt-3" name="cvc" type="text" onChange={(e) => cvcChanged(e)} style={{fontSize: '25px', width: '100%'}} placeholder="CVC"/>       
          </div>
          <div className="mt-12 flex flex-row justify-between ">
            <button
              className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
              onClick={(e) => handleNewOrder(e)}
            >
              Order Product
            </button>
          </div>
          <div>
            <span className="text-red-600 leading-7 font-bold mt-3">
              {message}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Category</h3>
        {category}
      </div>
    </div>
  );
}

export default Product;
