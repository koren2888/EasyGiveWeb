

const { default: mongoose } = require("mongoose");

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/productShop', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.log("no connection start");
    })

const seedProducts = [
    {
        name: 'Chair',
        price: 1.00,
        imagePath: "https://www.ikea.com/us/en/images/products/arkelstorp-desk-black__0735967_pe740301_s5.jpg?f=s",
        description: "Dining room chair."
    },
    {
        name: 'Table',
        price: 4.8,
        imagePath: "https://www.ikea.com/om/en/images/products/stefan-chair-brown-black__0727320_pe735593_s5.jpg?f=s",
        description: "Studying table."
    },
    {
        name: 'Mixer',
        price: 1.50,
        imagePath: "https://www.seriouseats.com/thmb/hMevGtiDkCJ_k7FUZ9TNq3Ud4Wc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__12__20151201-gift-guide-stand-mixer-1500x1125-712fb32a38d84c8097d3f5ce60ca626b.jpg",
        description: "Food mixer."
    },
    {
        name: 'Wing Chair',
        price: 1.50,
        imagePath: "https://www.ikea.com/om/en/images/products/strandmon-wing-chair-djuparp-dark-green__0531313_pe647261_s5.jpg?f=s",
        description: "Living room chair."
    },
    {
        name: 'Sofa',
        price: 1.50,
        imagePath: "https://www.ikea.com/om/en/images/products/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey__0175610_pe328883_s5.jpg?f=s",
        description: "Living room sofa."
    },
    {
        name: 'Mirror',
        price: 1.50,
        imagePath: "https://www.ikea.com/om/en/images/products/nissedal-mirror-white__0637801_pe698597_s5.jpg?f=s",
        description: "Room mirror."
    },
    {
        name: 'Parasol',
        price: 1.50,
        imagePath: "https://www.ikea.com/om/en/images/products/seglaroe-parasol-hanging-beige-tilting__0709141_pe726830_s5.jpg?f=s",
        description: "Sun umbrella."

    },
    {
        name: 'Drawers',
        price: 1.50,
        imagePath: "https://www.ikea.com/om/en/images/products/koppang-chest-of-3-drawers-white__0651169_pe706781_s5.jpg?f=s",
        description: "Drawers for storage."

    },
    {
        name: 'Bookcase',
        price: 1.50,
        imagePath: "https://www.ikea.com/om/en/images/products/baggebo-bookcase-white__0981552_pe815388_s5.jpg?f=s",
        description: "Cabinet for books."

    },
    {
        name: 'Cabinet',
        price: 1.50,
        imagePath: "https://www.ikea.com/om/en/images/products/eket-cabinet-combination-with-legs-white-wood__0915225_pe784665_s5.jpg?f=s",
        description: "Cabinet for storage."

    }

]
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
