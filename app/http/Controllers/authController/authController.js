const User = require ('../../../models/user') 
const bcrypt = require ('bcrypt')
const passport = require ('passport')

function authController () {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orderes' : '/'
    }
    return {
        index (req,res) {
            res.render ('auth/signin.ejs')
        },
        postSignin (req, res, next) {
            const { email, password }   = req.body
        //    Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/signin')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/signin')
                }
                req.login(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },
        upIndex (req, res) {
            res.render ('auth/signup.ejs')
        },
        async postSignup (req, res) {
            const { name, number, email, password } = req.body
            // vaidate requrest
            if(!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('number', number)
                req.flash('email', email)
                return res.redirect('/signup')
            }
            // password validator
            if (password >= 6) {
                req.flash('error', 'password lenth must be more then 6')
                req.flash('name', name)
                req.flash('number', number)
                req.flash('email', email)
                return res.redirect('/signup')
            }
            // Check if email exists 
            User.exists({ email: email }, (err, result) => {
                if(result) {
                req.flash('error', 'Email already taken')
                req.flash('name', name)
                req.flash('number', number)
                req.flash('email', email) 
                return res.redirect('/signup')
                }
            })
            // hashed password
            const hashedPassword = await bcrypt.hash(password, 10)
            // create neu user
            const user = new User ({
                name: name,
                number: number,
                email: email,
                password: hashedPassword
            })
            // save user
            user.save().then((user) => {
                // login
                return res.redirect('/signin')
            }).catch (err => {
                req.flash('error', 'Something whent wrong')
                return res.redirect('/register')
            })
        },
        logout (req, res) {
            req.logout()
            delete req.session.cart
            return res.redirect('/signup')
        }
    }
}

module.exports = authController