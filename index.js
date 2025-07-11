const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3500

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://aminboni048:aminboni@cluster0.lum0bq6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    const database = client.db("ABC").collection("XYZ");

    app.get('/users', async(req,res)=>{
        const cursor = database.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/users/:id', async(req,res)=>{
      const id = req.params.id 
      const query = {_id: new ObjectId(id)}
      const user = await database.findOne(query)
      res.send(user)
    })

    app.post('/users',async(req,res)=>{
        const abc= req.body 
        console.log(abc);
        const result = await database.insertOne(abc);
        res.send(result)
    })

    app.put('/users/:id', async(req,res)=>{
      const id = req.params.id 
      const updateUser = req.body
      console.log(updateUser,id);
      
      const quari = {_id : new ObjectId(id)}
      const options = {upsert:true}
      const updatDoc = {
        $set: {
          name: updateUser.name ,
          email: updateUser.email 
        }
      }
      const result = await database.updateOne(quari, updatDoc , options)
      res.send(result)
    })

    app.delete('/users/:id', async (req,res)=>{
        const id = req.params.id ;
        console.log('please Delete ',id);
        const query = { _id: new ObjectId(id) };
        const result = await database.deleteOne(query);
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
