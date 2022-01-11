const Menu = require('../../../models/menu')
const Food = require('../../../models/foodoffer')


function MenuController() {
    return {
        async Index(req, res) {
            const menu = await Menu.find()
            const food = await Food.find()
            return res.render('admin/adminMenu.ejs', { menu: menu, food: food })
        },
        avalibility(req, res) {
            Menu.updateOne({_id: req.body.menuId}, { avalibility: req.body.avalibility}, (err, data) => {
                if(err) {
                    console.log(err)
                    req.flash('error', 'something whent wrong')
                    return res.redirect('/admin/menu')
                } else {
                    res.redirect('/admin/menu')
                }
            })
        },all(req, res){
            Menu.updateMany({vendorName: req.body.vendorName}, { avalibility: req.body.avalibility }, (err, data) => {
                if(err) {
                    console.log(err)
                    req.flash('error', 'something whent wrong')
                    return res.redirect('/admin/menu')
                } else {
                    res.redirect('/admin/menu')
                } 
            })
        },
        oll(req, res) {
            Food.updateMany({ avalibility: req.body.avalibility }, (err, data) => {
                if(err) {
                    console.log(err)
                    req.flash('error', 'something whent wrong')
                    return res.redirect('/admin/menu')
                } else {
                    res.redirect('/admin/menu')
                } 
            })
        }
    }
}


module.exports = MenuController