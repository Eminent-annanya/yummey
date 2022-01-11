const Order = require('../../../models/order')
const User = require('../../../models/user')



function orderControler () {
    return {
            index (req,res) {
            Order.find({status:{$ne:'completed'}}, null, {sort:{'createdAt': -1}}).populate('customerId', '-password').exec((err, orders) => {
                if(req.xhr) {
                    return res.json(orders)                  
                }
                return res.render ('admin/orders.ejs')
            })    
        },
        aIndex (req, res) {
            return res.render('admin/admin.ejs')
        },
        pIndex (req, res) {
            return res.render('admin/adminPage.ejs')
        }
    }    
}

module.exports = orderControler
