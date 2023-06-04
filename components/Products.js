import ProductCard from "./ProductCard";

function Products({ products }) {
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-5xl font-bold mb-8">Clothes</h3>
      <div>
        {(
          <div className="grid grid-cols-2 w-full gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8 border">
            {products.map((product) => (
               <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
