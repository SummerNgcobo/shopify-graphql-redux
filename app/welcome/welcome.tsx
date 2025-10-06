// welcome.tsx
import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { shopifyFetch } from '../../src/lib/shopifyClient.js';

interface Product {
  id: string;
  title: string;
  featuredImage?: { url: string };
  variants: {
    edges: {
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  }[];
}

export const Welcome: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const query = `{
          products(first: 8) {
            edges {
              node {
                id
                title
                handle
                featuredImage { url }
                variants(first: 1) {
                  edges { node { price { amount currencyCode } } }
                }
              }
            }
          }
        }`;

        const data = await shopifyFetch(query);
        if (data?.products) {
          setProducts(data.products.edges.map((edge: any) => edge.node));
        } else {
          setError('No products found');
        }
      } catch (err: any) {
        setError('Failed to fetch products: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="welcome">
      <h1>Welcome to Our Store</h1>
      <div className="products-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.featuredImage?.url} alt={p.title} />
            <h3>{p.title}</h3>
            <p>${p.variants[0]?.edges[0]?.node?.price?.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
