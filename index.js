const dotnev = require("dotenv")
dotnev.config()
const express = require("express");
const { MongoClient,  ObjectId, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbqqyyb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    const db = client.db("Books");
    const productCollection = db.collection("Books");

    app.get("/books", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();
      res.send({ status: true, data: product });
    });

    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post("/post/book", async (req, res) => {
      const user = req.body;

      const result = await productCollection.insertOne(user);

      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
