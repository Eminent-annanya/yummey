const Menu = require('../../../models/menu')


function resturantController () {
    return {
        index (req,res) {
            res.render ('resturants/resturants.ejs')
        },
        async sai (req, res) {
            const menu = await Menu.find({vendorName: "Sai krupa resturant", avalibility: "TRUE" })
            res.render ('resturants/saikrupa.ejs', {menu: menu})
        },
        async dolphin (req, res) {
            const menu = await Menu.find({vendorName: "Dolphin Resturant", avalibility: "TRUE" })
            res.render ('resturants/dolphin.ejs', {menu: menu})
        },
        async foodies (req, res) {
            const menu = await Menu.find({vendorName: "Foodies resturant", avalibility: "TRUE" })
            res.render ('resturants/foodies.ejs', {menu: menu})
        },
        async greenchilli (req, res) {
            const menu = await Menu.find({vendorName: "Green chilli resturant", avalibility: "TRUE" })
            res.render ('resturants/greenchilli.ejs', {menu: menu})
        },
        async odian (req, res) {
            const menu = await Menu.find({vendorName: "Odian Resturant", avalibility: "TRUE" })
            res.render ('resturants/odian.ejs', {menu: menu})
        }
    }
}

module.exports = resturantController