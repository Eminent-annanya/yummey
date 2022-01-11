const Order = require('../../../models/order')


function statusController() {
    return {
        update (req, res) {
            Order.updateOne({_id: req.body.orderId}, { status: req.body.status}, (err, data) => {
                if(err) {
                    return res.redirect('/admin/orderes')
                }
                // Emit event 
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
                return res.redirect('/admin/orderes')
            })
        }
    }
}

module.exports = statusController