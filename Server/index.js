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
app.use(bodyParser.json());

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var fs = require('fs');

const Item = require('./models/Item');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const MONGO_URI = "mongodb+srv://EasyGive:bAhYlj9PsD6yuWpK@cluster0.pundpvx.mongodb.net/productShop?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.error(err);
        console.log("no connection start");
    })
   
app.get('/items', async (req, res) => {
    const items = await Item.find({});
    res.send(items);
})

app.get('/item/image/:imagePath', async (req, res) => {
    const filePath = `${__dirname}/public/${req.params.imagePath}`;
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send("Image not found!");
    }
})

app.post('/item', multipartMiddleware, async (req, res) => {
    console.log(req.body, req.files);

    const item = new Item(req.body);
    const imageExt = req.files.file.name.split('.').pop();
    const newImageName = `${item._id}.${imageExt}`;
    item.imagePath = newImageName;
    const newImagePath = `./public/${newImageName}`;

    console.log(`Saving new image to ${newImagePath}`);
    await fs.readFile(req.files.file.path, async function (err, data) {
        await fs.writeFile(newImagePath, data, function (err) {
            if (err) {
                console.log(err);
                res.status(503).send("Something went wrong!");
            }
        });
    });
    await item.save(function (err) {
        if (err) {
            console.log(err);
            fs.unlink(newImagePath);
            res.status(503).send("Something went wrong!");
        } else {
            console.log("New item added!");
            res.send("Ok");
        }
    });
})

app.listen(3001, () => {
    console.log("listening on port 3001!");
})
    