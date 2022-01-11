const Food = require ('../../models/foodoffer')
const Offer = require ('../../models/offer')


function homeControler () {
    return {
        async index (req,res) {
            const food = await Food.find({avalibility: "TRUE"})
            return res.render ('home.ejs', { food: food })
        },
        async offer (req,res) {
            const offer = await Offer.find()
            res.render ('offers/offer.ejs', { offer: offer })
        },
        async foodoffer (req, res) {
            const food = await Food.find({avalibility: "TRUE"})
            res.render('offers/foodoffers.ejs', { food: food })
        }
    }
}

module.exports = homeControler
