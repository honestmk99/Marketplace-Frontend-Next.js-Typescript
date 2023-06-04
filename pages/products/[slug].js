import Error from "next/error";
import { useRouter } from "next/router";
import Product from "../../components/Product";

function ProductPageContainer({ product }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Product
      id={product[0].id}
      name = {product[0].name}
      size = {product[0].size}
      image = {product[0].image}
      slug = {product[0].slug}
      price = {product[0].price}
      stock = {product[0].stock}
      category = {product[0].category}
      measurement = {product[0].measurement}
      weight = {product[0].weight}
    />
  );
}

export async function getStaticProps({ params }) {
  const productSlug = params.slug;
  const response = await fetch(`http://localhost:3001/api/products/${productSlug}`);
  const data = await response.text();
  const product = JSON.parse(data);
  return {
    props: {
      product,
    },
  };
}

// pages/products/[slug]
export async function getStaticPaths() {
  const response = await fetch('http://localhost:3001/api/products');
  const data = await response.text()
  const products = JSON.parse(data);
  const paths = products.map((product) => ({ params: { slug: String(product.id) }}))
  return {
    paths,
    fallback: false,
  }
}
export default ProductPageContainer;
