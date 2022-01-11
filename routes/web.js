// importing Controllers
//  home controllers
const homeController = require('../app/http/Controllers/homeController')
// orders and cart controller
const cartController = require('../app/http/Controllers/coustmers/cartController')
const orderController = require('../app/http/Controllers/coustmers/orderController')
// resturant controllers
const resturantController = require('../app/http/Controllers/resturant/resturantController')
// comming sonn Controllers
const frshController = require('../app/http/Controllers/yummeyfresh/freshController')
const martController = require('../app/http/Controllers/yummeymart/martController')
const helthController = require('../app/http/Controllers/yummeyhelth/helthController')
const mediController = require('../app/http/Controllers/yummeymedi/mediController')
// auth controllers
const authController = require('../app/http/Controllers/authController/authController')
// admin controller
const AdminOrderController = require('../app/http/Controllers/admin/orderController')
const statusController = require('../app/http/Controllers/admin/statusController')
const menuController = require('../app/http/Controllers/admin/menuController')
// middelwares in use
const guest = require('../app/http/middelwares/guest')
const auth = require('../app/http/middelwares/auth')
const admin = require('../app/http/middelwares/admin')
const MenuController = require('../app/http/Controllers/admin/menuController')



// setup of webs
function initRouts (app) {
    // only get routs
    // home route
    app.get ('/', homeController().index)
    app.get ('/offers', homeController().offer)
    app.get ('/offers/food', homeController().foodoffer)

    // auth routs
    app.get ('/signin', guest, authController().index)
    app.get ('/signup', guest, authController().upIndex)


    // coustmer routs
    app.get ('/cart', cartController().cart)
    app.get ('/cart/order', auth, orderController().index)
    app.get ('/cart/order/:id', auth, orderController().show)


    // resturants routs
    app.get ('/resturant', resturantController().index)
    app.get ('/resturant/saikrupa', resturantController().sai)
    app.get ('/resturant/foodies', resturantController().foodies)
    app.get ('/resturant/greenchilli', resturantController().greenchilli)
    app.get ('/resturant/dolphin', resturantController().dolphin)
    app.get ('/resturant/odian', resturantController().odian)

    

    // yummeyfresh routs
    app.get ('/fresh', frshController().index)
    app.get ('/fresh/sweet', frshController().sweet)
    app.get ('/fresh/vegitable', frshController().vegi)
    app.get ('/fresh/panner', frshController().paneer)
    app.get ('/fresh/fish', frshController().fish)
    app.get ('/fresh/chiken', frshController().chiken)
    app.get ('/fresh/mutton', frshController().mutton)

    // yummeymart routs
    app.get ('/mart', martController().index)
    app.get ('/mart/ration', martController().ration)
    app.get ('/mart/dryfruits', martController().dry)
    app.get ('/mart/drinks', martController().drinks)


    // yummeyhelth routs
    app.get ('/helth', helthController().index)
    app.get ('/helth/helthyfood', helthController().food)
    app.get ('/helth/juice', helthController().juice)
    app.get ('/helth/nutrition', helthController().nutri)


    // yummeymedi routs
    app.get ('/medicare', mediController().index)
    app.get ('/medicare/alopathic', mediController().alopathic)
    app.get ('/medicare/ayurvedic', mediController().ayurvedic)
    app.get ('/medicare/foodsuppliment', mediController().food)

    // admins block
    app.get('/admin', admin, AdminOrderController().aIndex)
    app.get('/admin/page', admin, AdminOrderController().pIndex)
    app.get('/admin/orderes', admin, AdminOrderController().index)
    app.get('/admin/menu', admin, MenuController().Index)

    

    // post methods

    // cart route
    app.post('/update-cart', auth, cartController().update)
    
    // auth routs
    app.post('/signup', authController().postSignup)
    app.post('/signin', authController().postSignin)
    app.post('/logout', authController().logout)

    // orders rout
    app.post('/cart/order', auth, orderController().store)
    app.post('/delete', cartController().delet)

    // admin routs
    app.post('/admin/order/status', admin, statusController().update)
    app.post('/admin/menu/status', menuController().avalibility)
    app.post('/admin/menu/all', menuController().all)
    app.post('/admin/menu/oll', menuController().oll)


}



module.exports = initRouts