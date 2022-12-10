const express = require("express");
const { default: mongoose } = require("mongoose");

var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();

app.use(cors({
    origin: '*'
}))

app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded( { extended: true }));
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json())
const Product = require('./models/Product');
const Purchase = require('./models/purchase');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/productShop', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.log("no connection start");
    })
   
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

app.post('/purchase', async (req, res) => {
    const { products, buyerInfo } = req.body;
    Purchase.create({...buyerInfo, products: products})
})

app.listen(3001, () => {
    console.log("listening on port 3001!");
})
    