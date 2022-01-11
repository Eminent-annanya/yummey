
function frshController () {
    return {
        index (req,res) {
            res.render ('yummyfresh/yummeyfresh.ejs')
        },
        sweet (req,res) {
            res.render ('yummyfresh/sweet.ejs')
        },
        vegi (req,res) {
            res.render ('yummyfresh/vegitable.ejs')
        },
        paneer (req,res) {
            res.render ('yummyfresh/panner.ejs')
        },
        fish (req,res) {
            res.render ('yummyfresh/fish.ejs')
        },
        chiken (req,res) {
            res.render ('yummyfresh/chiken.ejs')
        },
        mutton (req,res) {
            res.render ('yummyfresh/mutton.ejs')
        }                
    }
}

module.exports = frshController 