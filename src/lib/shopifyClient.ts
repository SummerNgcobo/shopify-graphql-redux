const SHOPIFY_DOMAIN = "we-sell-clothes-and-socks-my.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "e8c507700ab7338eafbae53bb531b126";

export async function shopifyFetch(query: string, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) console.error("Shopify API Error:", json.errors);
  return json.data;
}
