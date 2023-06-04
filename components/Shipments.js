function Shipments({ shipments }) {
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-5xl font-bold mb-8">Shipments</h3>
      <div>
        {(
          <div className="grid">
            {
              shipments.length > 0 ? 
              <div>
                <div style={{display: 'flex'}}>
                  <span style={{textAlign: 'left', width: '25%'}}>Name</span>
                  <span style={{textAlign: 'left', width: '25%'}}>Price</span>
                  <span style={{textAlign: 'left', width: '25%'}}>Quantity</span>
                  <span style={{textAlign: 'left', width: '25%'}}>Status</span>
                </div>
                { shipments.map((shipment) => (
                  <div key={shipment.id} style={{display: 'flex'}}>
                    <span style={{textAlign: 'left', width: '25%'}}>{shipment.name}</span>
                    <span style={{textAlign: 'left', width: '25%'}}>${shipment.price}</span>
                    <span style={{textAlign: 'left', width: '25%'}}>{shipment.quantity}</span>
                    <span style={{textAlign: 'left', width: '25%'}}>{shipment.status}</span>
                  </div>
                )) }
              </div>  : <>No shipments</>
            }
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Shipments;
