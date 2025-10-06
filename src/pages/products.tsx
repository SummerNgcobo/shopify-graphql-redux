import React, { useEffect, useState } from "react";
import { getProducts } from "../api/shopify";

// Type definitions for Shopify product data
interface ProductImageNode {
  src: string;
  altText: string | null;
}

interface ProductImageEdge {
  node: ProductImageNode;
}

interface ProductImages {
  edges: ProductImageEdge[];
}

interface ProductVariantPrice {
  amount: string;
  currencyCode: string;
}

interface ProductVariantNode {
  id: string;
  title: string;
  price: ProductVariantPrice;
}

interface ProductVariantEdge {
  node: ProductVariantNode;
}

interface ProductVariants {
  edges: ProductVariantEdge[];
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: ProductImages;
  variants: ProductVariants;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts(5); // fetch 5 products
        setProducts(data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;
  if (!products.length) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛍️ Shopify Products</h1>
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {products.map((product) => {
          const image = product.images?.edges?.[0]?.node?.src;
          const price = product.variants?.edges?.[0]?.node?.price?.amount;

          return (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              {image && <img src={image} alt={product.title} width={200} />}
              <h3>{product.title}</h3>
              <p>{product.description?.substring(0, 80)}...</p>
              <p>
                <strong>R{price}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
