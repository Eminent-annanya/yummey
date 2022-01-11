function mediController () {
    return {
        index (req,res) {
            res.render ('yummeymedi/yummeymedi.ejs')
        },
        alopathic (req,res) {
            res.render ('yummeymedi/alopathic.ejs')
        },
        ayurvedic (req,res) {
            res.render ('yummeymedi/ayurvedic.ejs')
        },
        food (req,res) {
            res.render ('yummeymedi/foodsuppliment.ejs')
        }
    }
}

module.exports = mediController