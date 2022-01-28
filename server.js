// env cofig
require('dotenv').config()
// express setup
const express = require ('express');
const app = express();
const ejs = require("ejs");
const path = require("path");
const expresslayout = require("express-ejs-layouts");
const session = require('express-session');
const PORT = process.env.PORT || 3000
// mongoose setup
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
// flash setup
const flash = require('express-flash');
// passport
const passport = require('passport')
// emmiter
const Emitter = require('events')
// rozer pay
const Rozerpay = require('razorpay')
const Crypto = require('crypto')

var instance = new Rozerpay({
  key_id: process.env.PAY_KEY, 
  key_secret: process.env.PAY_SECRET,
});


// mongoose setups "database connections"
async function main() {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL);
}

main().catch(err => console.log(err));

const connection = mongoose.connection;

connection.once ('open', () => {
  console.log ('database connected')
});

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


// session setup
app.use(session({
  secret: process.env.YUMMEY_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL
  }) ,
  cookie: {maxAge: 1000 * 60 * 60 * 24 }
}))

// passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})


// flsh setup
app.use(flash())

// data reading
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



// asset to use
app.use(express.static("public"));


// set templet engin
app.use(expresslayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// routs config
require("./routes/web.js")(app);
app.use((req, res) => {
  res.status(404).render('errors/404.ejs')
})



// port listening
const server = app.listen(PORT, () => {
    console.log(`listening on post ${PORT}`);
  });


// soket io connection
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  // Join
  socket.on('join', (orderId) => {
    // console.log(orderId)
    socket.join(orderId)
  })
})

  eventEmitter.on('orderUpdated', (data) => {
  io.to(`order_${data.id}`).emit('orderUpdated', data)
  })

eventEmitter.on('orderPlaced', (data) => {
io.to('adminRoom').emit('orderPlaced', data)
})