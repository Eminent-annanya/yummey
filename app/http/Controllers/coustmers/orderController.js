const Order = require('../../../models/order')
const moment = require('moment')



function orderController () {
    return {
        store(req, res) {
            const { number, address } = req.body
            if(!number) {
                req.flash('error', 'Contect_No required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                rate: req.session.cart.totalrate, 
                items: req.session.cart.items,
                number,
                address
            })

            order.save().then(result => {
                // req.flash('success', 'Order placed successfully')
                delete req.session.cart
                // Emit event 
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderPlaced', result)
                return res.json({success : 'Order placed successfully'})
                // return res.redirect('/cart/order') 
            }).catch(err => {
                req.flash('error', 'Something whent wrong')
                console.log(err)
                return res.redirect('/cart') 
            })
        },
        async index (req,res) {
            const orders = await Order.find({ customerId: req.user._id }, null, {sort:{'createdAt': -1}}).populate('items') 
            res.render ('coustmer/orders.ejs', { orders: orders, moment: moment })
        },
        async show (req, res) {
            const order = await Order.findById(req.params.id)
            // autharize user
            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('coustmer/singelOrder', { order })
            }
            return res.redirect('/')
        }
    }
}

module.exports = orderController