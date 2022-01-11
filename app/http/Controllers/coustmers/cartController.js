const session = require("express-session")
const Food = require ('../../../models/foodoffer')
const user = require ('../../../models/user')
const Order = require ('../../../models/order')


function cartController () {
    return {
        async cart (req,res) {
            const food = await Food.find({avalibility: "TRUE"})
            res.render ('coustmer/cart.ejs', {food: food})
        },
        async update (req, res) {
            
            
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0,
                    totalDiscount: 0,
                    totalgst: 0,
                    totalDelivery: 0,
                    totalrate: 0
                }
            }
            let cart = req.session.cart
            const order = await Order.find({customerId: req.user._id})

            if(!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price   
                if (!order.length) {
                    discount = cart.totalPrice * 0.30
                } else if(cart.totalPrice >= 300) {
                    discount = cart.totalPrice * 0.10 
                } else {
                    discount = cart.totalPrice * 0.03
                }
                cart.totalDiscount = discount
                cart.totalgst = cart.totalPrice * 0.05
                if (cart.totalQty <= 1 ) {
                    delivery = 28
                } else if(cart.totalQty <= 3 ) {
                    delivery = 24
                } else if(cart.totalQty <= 5 ) {
                    delivery = 18
                } else if(cart.totalQty <= 20) {
                    delivery = 0
                }
                cart.totalDelivery = delivery
                cart.totalrate = cart.totalPrice + cart.totalgst + cart.totalDelivery - cart.totalDiscount 
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price 
                if (!order.length) {
                    discount = cart.totalPrice * 0.30
                } else if(cart.totalPrice >= 300) {
                    discount = cart.totalPrice * 0.10 
                } else {
                    discount = cart.totalPrice * 0.03
                }
                cart.totalDiscount = discount
                cart.totalgst = cart.totalPrice * 0.05
                if (cart.totalQty <= 1 ) {
                    delivery = 35
                } else if(cart.totalQty <= 3 ) {
                    delivery = 28
                } else if(cart.totalQty <= 5 ) {
                    delivery = 22
                }
                cart.totalDelivery = delivery
                cart.totalrate = cart.totalPrice + cart.totalDelivery - cart.totalDiscount 
            } 

            
            // return res.json ({data:'All ok'})
            return res.json({ totalQty: req.session.cart.totalQty })
        }, delet(req, res) {
            if (req.session.cart){
                delete req.session.cart
                return res.redirect('/')
            } else {
                console.log('something whent wrong')
            }
        }            
    }   
}

module.exports = cartController