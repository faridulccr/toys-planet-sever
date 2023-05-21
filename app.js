// create an express server
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const {
    getAllProducts,
    getSingleProduct,
    findProductByEmail,
    findProductByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("./controllers/product.controller");

// create express server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("views"));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // create a collection for products in myDB
        const productsCollection = client.db("myDB").collection("products");

        // get all products
        app.get("/api/products", getAllProducts(productsCollection));

        // get single product
        app.get(
            "/api/single-product/:id",
            getSingleProduct(productsCollection)
        );

        // find product by email
        app.get(
            "/api/user-products/:email",
            findProductByEmail(productsCollection)
        );

        // find product by category
        app.get(
            "/api/product-category",
            findProductByCategory(productsCollection)
        );

        // create product
        app.post("/api/create-product", createProduct(productsCollection));

        // update product
        app.put("/api/update-product/:id", updateProduct(productsCollection));

        // delete product
        app.delete(
            "/api/delete-product/:id",
            deleteProduct(productsCollection)
        );

        // not found error handling
        app.use((req, res, next) => {
            res.status(404).json({
                message: "Not Found",
            });
        });

        // server error handling
        app.use((err, req, res, next) => {
            console.log(err.stack);
            res.status(500).send("something broke");
        });
        // console.log("connected");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

module.exports = app;
