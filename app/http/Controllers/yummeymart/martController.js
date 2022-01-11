function martController () {
    return {
        index (req,res) {
            res.render ('yummeymart/yummeymart.ejs')
        },
        ration (req,res) {
            res.render ('yummeymart/ration.ejs')
        },
        dry (req,res) {
            res.render ('yummeymart/dryfruits.ejs')
        },
        drinks (req,res) {
            res.render ('yummeymart/drinks.ejs')
        }
    }
}

module.exports = martController