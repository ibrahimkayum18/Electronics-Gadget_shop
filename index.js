const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//shopifyProducts
//D8w95RdmzdUl9jrJ


const uri = `mongodb+srv:// ibrahimkayum017:D8w95RdmzdUl9jrJ@cluster0.pqcfxjd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const shopifyCollection = client.db("shopifyProductsDB").collection("shopifyProducts")
    //Access data from front end
    app.post('/shopifyProducts', async (req, res) => {
        const products = req.body;
        const result = await shopifyCollection.insertOne(products);
        res.send(result)
    })

    app.get('/shopifyProducts', async(req, res) => {
          const result = await shopifyCollection.find().toArray();
          res.send(result);
      })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})