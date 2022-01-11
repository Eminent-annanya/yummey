function helthController () {
    return {
        index (req,res) {
            res.render ('yummeyhelth/yummeyhelth.ejs')
        },
        food (req,res) {
            res.render ('yummeyhelth/helthyfood.ejs')
        },
        juice (req,res) {
            res.render ('yummeyhelth/juice.ejs')
        },
        nutri (req,res) {
            res.render ('yummeyhelth/nutrition.ejs')
        }
    }
}

module.exports = helthController