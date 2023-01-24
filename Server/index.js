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
    let conditions = req.query.conditions ?? "";
    let query = {
        itemType: {
            $regex: new RegExp(req.query.itemType, 'i')
        },
        condition: {
            $regex: new RegExp(conditions.split(",").join("|"), 'i')
        }
    }
    const items = await Item.find(query);
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

app.put('/item', multipartMiddleware, async (req, res) => {
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

app.post('/item/:_id', multipartMiddleware, async (req, res) => {
    console.log(`Updaing ${req.params._id}`, req.body, req.files);

    Item.findByIdAndUpdate(req.params._id, req.body, function (err, doc) {
        if (err) {
            console.log(err);
            res.status(503).send("Something went wrong!");
        } else if (doc) {
            if (Object.keys(req.files).length != 0) {
                const imageExt = req.files.file.name.split('.').pop();
                const newImageName = `${doc._id}.${imageExt}`;
                const newImagePath = `./public/${newImageName}`;
                fs.readFile(req.files.file.path, async function (err, data) {
                    fs.writeFile(newImagePath, data, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(503).send("Something went wrong!");
                        } else {
                            if (doc.imagePath !== newImageName) {
                                const oldImagePath = `./public/${doc.imagePath}`;
                                fs.unlink(oldImagePath, (err) => {
                                    if (err) {
                                        console.error(err);
                                        res.status(503).send("Something went wrong!");
                                    }
                                    console.log(`${doc.imagePath} was deleted`);
                                });
                                doc.imagePath = newImageName;
                                doc.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                        res.status(503).send("Something went wrong!");
                                    }
                                });
                            }
                            res.send("Updated");
                        }
                    });
                });
            } else {
                res.send("Updated");
            }
        } else {
            res.status(404).send("Item not found");
        }
    });
})

app.delete('/item/:_id', async (req, res) => {
    console.log(`Deleting ${req.params._id}`);
    Item.findOneAndDelete({ _id: req.params._id }, function (err, doc) {
        if (err) {
            console.error(err);
            res.status(503).send("Something went wrong!");
        }
        else if (doc) {
            console.log("Deleted Item: ", doc);
            const deletedImagePath = `./public/${doc.imagePath}`;
            fs.unlink(deletedImagePath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(503).send("Something went wrong!");
                }
                console.log(`${doc.imagePath} was deleted`);
                res.send("Deleted");
              });
        }
    });
})

app.listen(3001, () => {
    console.log("listening on port 3001!");
})
    