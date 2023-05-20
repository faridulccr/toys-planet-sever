// get all products
const getAllProducts = (products) => {
    return async (req, res) => {
        const products = await products.find().toArray();
        // console.log(products);

        products.length > 0
            ? res.status(200).json(products)
            : res.status(200).json({ message: "data not found" });
    };
};

// get single product
const getSingleProduct = (products) => {
    return async (req, res) => {
        const products = await products.find().toArray();
        // console.log(products);

        products.length > 0
            ? res.status(200).json(products)
            : res.status(200).json({ message: "data not found" });
    };
};

// find product by email
const findProductByEmail = (products) => {
    return async (req, res) => {};
};

// find product by category
const findProductByCategory = (products) => {
    return async (req, res) => {};
};

// create product
const createProduct = (products) => {
    return async (req, res) => {
        const newUser = await usersCollection.insertOne({
            name: "farid",
            age: 28,
        });
        res.status(200).json(newUser);
    };
};

// update product
const updateProduct = (products) => {
    return async (req, res) => {};
};

// delete product
const deleteProduct = (products) => {
    return async (req, res) => {};
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    findProductByEmail,
    findProductByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
};
