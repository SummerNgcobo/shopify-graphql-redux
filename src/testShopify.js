import { shopifyClient } from "./lib/shopifyClient.js";

const PRODUCTS_QUERY = `
  {
    products(first: 5) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
          }
        }
      }
    }
  }
`;

async function testShopifyConnection() {
  const data = await shopifyClient(PRODUCTS_QUERY);
  console.log("✅ Shopify Products:", data.products.edges);
}

testShopifyConnection();
