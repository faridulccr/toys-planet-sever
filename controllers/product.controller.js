const { ObjectId } = require("mongodb");

// get all products
const getAllProducts = (products) => {
    return async (req, res) => {
        const allProducts = await products.find().toArray();
        // console.log(allProducts);

        allProducts.length > 0
            ? res.status(200).json(allProducts)
            : res.status(404).json({ message: "data not found" });
    };
};

// get single product
const getSingleProduct = (products) => {
    return async (req, res) => {
        // Generate a new ObjectId
        const objectId = new ObjectId(req.params.id);
        const singleProduct = await products.find({ _id: objectId }).toArray();
        // console.log(singleProduct);

        singleProduct.length > 0
            ? res.status(200).json(singleProduct)
            : res.status(404).json({ message: "data not found" });
    };
};

// find product by email
const findProductByEmail = (products) => {
    return async (req, res) => {
        const userProducts = await products
            .find({ email: req.params.email })
            .toArray();
        // console.log(userProducts);

        userProducts.length > 0
            ? res.status(200).json(userProducts)
            : res.status(404).json({ message: "data not found" });
    };
};

// find product by category
const findProductByCategory = (products) => {
    return async (req, res) => {
        const sports_cars = await products
            .find({ category: "sports car" })
            .toArray();
        // console.log(sports_cars);

        const trucks = await products.find({ category: "truck" }).toArray();
        // console.log(trucks);

        const police_cars = await products
            .find({ category: "police car" })
            .toArray();
        // console.log(police_cars);

        sports_cars.length > 0 || trucks.length > 0 || police_cars.length > 0
            ? res.status(200).json({ sports_cars, trucks, police_cars })
            : res.status(404).json({ message: "data not found" });
    };
};

// create product
const createProduct = (products) => {
    return async (req, res) => {
        const newProduct = await products.insertOne(req.body);
        // console.log(newProduct);

        newProduct
            ? res.status(200).json({ message: "product successfully added" })
            : res.status(404).json({ error: "something is broken" });
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
