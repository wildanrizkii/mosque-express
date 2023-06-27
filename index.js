const express = require('express');
const product = require('./api/product')
const app = express();

const PORT = process.env.PORT || 8080;

app.use("/api/product", product);

app.listen(PORT, () => console.log(`Ready!`));