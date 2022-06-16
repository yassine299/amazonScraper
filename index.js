const express = require("express");
const request = require("request-promise");
const path = require("path");
const cors = require("cors");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.apiKey;
const baseUrl = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
app.use(cors());

//const generetUrlscraper = (apikey) => {
//  `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
//}

app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
})

//Get api details
app.get("/products/:productID", async (req, res) => {
    const { productID } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productID}`);
        res.json(JSON.parse(response));
    }
    catch (err) {
        res.json(err);
    }
})


//Get products reviews
app.get("/products/:productID/reviews", async (req, res) => {
    const { productID } = req.params;


    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productID}`);
        res.json(JSON.parse(response));
    }
    catch (err) {
        res.json(err);
    }
})

//Get products offers
app.get("/products/:productID/offers", async (req, res) => {
    const { productID } = req.params;


    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productID}`);
        res.json(JSON.parse(response));
    }
    catch (err) {
        res.json(err);
    }
})

//Get search list
app.get("/search/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;


    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    }
    catch (err) {
        res.json(err);
    }
})




//start server
app.listen(PORT, () => {
    console.log(`server is up runing on ${PORT} link =>  http://localhost:${PORT}/`);
})