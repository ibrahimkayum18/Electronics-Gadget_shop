const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//shopifyProducts
//D8w95RdmzdUl9jrJ


const uri = `mongodb+srv://ibrahimkayum017:D8w95RdmzdUl9jrJ@cluster0.pqcfxjd.mongodb.net/?retryWrites=true&w=majority`;

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
    const cartCollection = client.db("shopifyProductsDB").collection("cart")
    //Access data from front end into shopify product
    app.post('/shopifyProducts', async (req, res) => {
        const products = req.body;
        const result = await shopifyCollection.insertOne(products);
        res.send(result)
    })
    //Access data fom client side into cart collection
    app.post('/cart', async(req, res) => {
      const data = req.body;
      const result = await cartCollection.insertOne(data)
      res.send(result)
    })

    app.get('/cart', async(req, res) => {
      const result = await cartCollection.find().toArray();
      res.send(result);
    })

    app.get('/shopifyProducts', async(req, res) => {
          const result = await shopifyCollection.find().toArray();
          res.send(result);
      })

      app.post('/shopifyProducts/:brand', async(req, res) => {
        const product = req.params.brand;
        const result = await appleCollection.insertOne(product)
        res.send(result)
      })

      app.get('/shopifyProducts/:id', async(req, res) => {
        const id = req.params.id;
        const filter = {
          _id: new ObjectId(id)
        }
        const result = await shopifyCollection.findOne(filter)
        res.send(result)
      })

      app.put('/shopifyProducts/:id', async(req, res) => {
        const id = req.params.id;
        const data = req.body;
        const filter = {
            _id: new ObjectId(id)
        };
        const option = {upsert: true}
        const updateData = {
            $set: {
                name: data.name,
                brand: data.brand,
                p_type: data.p_type,
                price: data.price,
                rating: data.rating,
                p_description: data.p_description,
                photo: data.photo
            }
        }
        const result = await shopifyCollection.updateOne(filter, updateData, option)
        res.send(result)
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