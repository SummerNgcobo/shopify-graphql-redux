
// Load the access token as per instructions above
const storefrontAccessToken =  "e8c507700ab7338eafbae53bb531b126";
// Shop from which we're fetching data
const shop = "https://admin.shopify.com/store/we-sell-clothes-and-socks-my";

// StorefrontClient takes in the shop url and the Storefront Access Token for that shop.
const storefrontClient = new shopify.clients.Storefront({
  domain: shop,
  storefrontAccessToken,
});

// Use client.query and pass your query as \`data\`
const products = await storefrontClient.query({
  data: `{
    products (first: 5) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`,
});

const productQuery = `
  query ProductQuery($handle: String) {
    product(handle: $handle) {
      id
      title
      handle
    }
  }
`;

const {data, errors, extensions} = await client.request(productQuery, {
  variables: {
    handle: 'sample-product',
  },
});