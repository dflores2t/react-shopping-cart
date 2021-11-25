require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortId = require('shortid');
const shortid = require('shortid');


const app = express();

app.use(express.json());


mongoose.connect(
  process.env.MONGO_URL
  //   {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false,
  //     useUnifiedTopology: true,
  //   }
);


const Product = mongoose.model('products', new mongoose.Schema({
    _id:{type:String,default:shortid.generate},
    image:String,
    title:String,
    description:String,
    availableSizes:[String],
    price:Number
}))

app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.status(200).send(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.send(saveProduct);
});


const port = process.env.PORT || 5000;

app.delete('/api/products/:id', async (req, res)=> {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    res.status(200).send(deleteProduct)
})

app.listen(port, () => {
    console.log('server on port 5000')
})