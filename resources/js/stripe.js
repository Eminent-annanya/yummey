import axios from "axios"
// import Razorpay from "razorpay"
// import Crypto from "crypto"
import Swal from 'sweetalert2'

function initStripe() {

    

    const paymentType = document.querySelector('#paymentType')
    if (paymentType) {
        paymentType.addEventListener('change', (e) => {
            console.log(e.target.value)
        })
    }


    const payment = document.querySelector("#payment-form");
    if(payment) {

        // var instance = new Razorpay({
        //     // key_id: process.env.PAY_KEY, 
        //     // key_secret: process.env.PAY_SECRET,
        //   });
        
        payment.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(payment)
            let formObject = {}
            
            for(let [key, value] of formData.entries()) {
                formObject[key] = value
            }
            
            
            axios.post('/cart/order', formObject).then((res) => {
                cartCounter.innerText = res.data.totalQty
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: res.data.message,
                    timer: 1000
                })
                setTimeout(() => {   
                    window.location.href = '/cart/order'
                }, 1000);
                // console.log(res.data)
            }). catch((err) => {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'Opps your Order Failed....',
                    timer: 1500
                })
                // console.log(err)
            })
            // console.log(formObject)
            
        })
    }
}


export default initStripe