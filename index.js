const express = require("express");
require("dotenv").config();
const httpStatus = require("http-status");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors({ origin: ["https://evergreen-nursery-client.vercel.app"] }));
// app.use(cors({ origin: "*" }));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2g6iibi.mongodb.net/nurseryDB?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    const db = client.db("nurseryDB");
    const productsCollection = db.collection("products");
    const categoryCollection = db.collection("category");

    app.get("/products", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || null;
        const pageSize = parseInt(req.query.pageSize) || null;

        if (page && pageSize) {
          // Calculate the number of documents to skip and limit
          const skip = (page - 1) * pageSize;
          const limit = pageSize;
          const sort = req.query.sort || "price";
          const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

          // Get the total number of documents
          const totalCount = await productsCollection.countDocuments();

          // Get the products for the current page
          const products = await productsCollection
            .find()
            .sort({ [sort]: sortOrder })
            .skip(skip)
            .limit(limit)
            .toArray();

          // Send the products along with the total count
          res.json({
            result: products,
            totalCount,
          });
        } else {
          const products = await productsCollection.find().toArray();
          res.json(products);
        }
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to retrieve products",
          error: error.message,
        });
      }
    });

    app.get("/products/:id", async (req, res) => {
      try {
        const id = req.params.id;

        // Validate the id is a valid ObjectId
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ID format" });
        }

        const product = await productsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!product) {
          return res.status(404).json({
            statusCode: 404,
            message: "Product not found",
          });
        }

        res.json({
          statusCode: 200,
          message: "Product retrieved successfully",
          product,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
          statusCode: 500,
          message: "Failed to retrieve product",
          error: error.message,
        });
      }
    });

    app.post("/products", async (req, res) => {
      try {
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct);
        res.json({
          statusCode: httpStatus.OK,
          message: "Product added successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to add product",
          error: error.message,
        });
      }
    });

    app.put("/products/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);

        const updatedProduct = req.body;

        const result = await productsCollection.updateOne(
          { _id: id },
          { $set: updatedProduct }
        );
        res.json({
          statusCode: httpStatus.OK,
          message: "Product updated successfully",
        });
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to update product",
          error: error.message,
        });
      }
    });

    app.delete("/products/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const result = await productsCollection.deleteOne({ _id: id });
        res.json({
          statusCode: httpStatus.OK,
          message: "Product deleted successfully",
        });
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to delete product",
          error: error.message,
        });
      }
    });

    app.get("/search", async (req, res) => {
      const { title } = req.query;

      console.log(title);

      if (!title) {
        return res
          .status(400)
          .json({ message: "Title query parameter is required." });
      }

      try {
        const plants = await productsCollection
          .find({
            title: { $regex: title, $options: "i" },
          })
          .toArray();

        console.log(plants);

        res.status(200).json(plants);
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    });

    app.get("/categories", async (req, res) => {
      try {
        const categories = await categoryCollection.find().toArray();
        res.json(categories);
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to retrieve categories",
          error: error.message,
        });
      }
    });

    app.post("/addCategory", async (req, res) => {
      try {
        const newProduct = req.body;
        const result = await categoryCollection.insertOne(newProduct);
        res.json({
          statusCode: httpStatus.OK,
          message: "Catagory added successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to add category",
          error: error.message,
        });
      }
    });

    app.delete("/deleteCategory/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const result = await categoryCollection.deleteOne({ _id: id });
        res.json({
          statusCode: httpStatus.OK,
          message: "Category deleted successfully",
        });
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to delete category: ",
          error: error.message,
        });
      }
    });

    app.put("/updateCategory/:id", async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);

        const updatedCategory = req.body;

        const result = await categoryCollection.updateOne(
          { _id: id },
          { $set: updatedCategory }
        );
        res.json({
          statusCode: httpStatus.OK,
          message: "Category updated successfully",
        });
      } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to update category",
          error: error.message,
        });
      }
    });

    app.put("/update-quantities", async (req, res) => {
      const cart = req.body.items;

      try {
        // Iterate through the cart array and update each product
        for (let item of cart) {
          await productsCollection.updateOne(
            { _id: new ObjectId(item.productId) },
            { $inc: { quantity: -item.quantity } }
          );
        }

        res.status(200).json({ message: "Quantities updated successfully" });
      } catch (error) {
        res.status(500).json({
          message: "Failed to update quantities",
          error: error.message,
        });
      }
    });
  } finally {
    // Ensure the client will close when you finish/error
    // Uncomment the following line if you want to close the connection
    // await client.close();
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to evergreen nursery server.");
});

app.listen(port, () => {
  console.log(`Nursery app is listening on port ${port}.`);
});
