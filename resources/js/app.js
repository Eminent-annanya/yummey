import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import initAdmin from './admin'
import initStripe from './stripe'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(menu){
    axios.post('/update-cart', menu).then(res => {
        cartCounter.innerText = res.data.totalQty
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Ordered Cart successfully',
          timer: 1000
        })
        // console.log(res)
    }).catch (err => {
        Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Opps your Order Failed....',
            timer: 1500
          })
    })

}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let menu = JSON.parse(btn.dataset.menu)
        updateCart(menu)
    })
})



const alretMessage = document.querySelector("#success-alert")
if(alretMessage) {
    setTimeout(() => {
        alretMessage.remove()
    }, 2000)
}




// change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);

// payment gateway
initStripe()

// socket connection with call back of admin
let socket = io()

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}

// admin event emmiter
let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}

// event emmiters event coustmer
socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})