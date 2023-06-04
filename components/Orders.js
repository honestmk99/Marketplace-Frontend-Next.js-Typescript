function Orders({ orders }) {
  console.log('==========', orders);
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-5xl font-bold mb-8">Orders</h3>
      <div>
        {(
          <div className="grid">
            {
              orders.length > 0 ? 
              <div>
                <div style={{display: 'flex'}}>
                  <span style={{textAlign: 'left', width: '25%'}}>Name</span>
                  <span style={{textAlign: 'left', width: '25%'}}>Price</span>
                  <span style={{textAlign: 'left', width: '25%'}}>Quantity</span>
                  <span style={{textAlign: 'left', width: '25%'}}>Status</span>
                </div>
                { orders.map((order) => (
                  <div key={order.id} style={{display: 'flex'}}>
                    <span style={{textAlign: 'left', width: '25%'}}>{order.name}</span>
                    <span style={{textAlign: 'left', width: '25%'}}>${order.price}</span>
                    <span style={{textAlign: 'left', width: '25%'}}>{order.quantity}</span>
                    <span style={{textAlign: 'left', width: '25%'}}>{order.status}</span>
                  </div>
                )) }
              </div>  : <>No orders</>
            }
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
