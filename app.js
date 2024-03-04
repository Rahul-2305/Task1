const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/open-to-cors/assignment.json"
    );
    const products = response.data.products;
    const formattedProducts = Object.keys(products).map((key) => {
      const product = products[key];
      product.popularity = parseInt(product.popularity);
      return product;
    });
    const sortedProducts = formattedProducts.sort(
      (a, b) => b.popularity - a.popularity
    );
    const displayProducts = sortedProducts.map((product) => ({
      title: product.title,
      price: product.price,
    }));

    res.json(displayProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
