const passport = require ('passport')
const LocalStrategy =  require('passport-local').Strategy

//talk to database to bring in the model to pass to sequelize
const db = require('../models')

//talk to sequelize to see if this user with this name exist
passport.serializeUser((user, cb)=>{
    cb(null, user.id)
})
passport.deserializeUser((id, cb)=>{
    db.user.findByPK(id)
    .then(user =>{
        if(user){
            cb(null, user)
        }
        console.log('user is null....')
    })
    .catch(error =>{
        console.log('yo..there is an error!')
        console.log(error)
    })
})

//uniqueness of password by relating to email
passport.use(new LocalStrategy({
    usernameField: 'email',
    passportfield: 'password'
},(email, password, cb) =>{
    db.user.findOne({
        where:{email} //email: email in parenthise above
    })
    .then(user =>{
        if(!user || user.validPassword(password)){ //validPasword function is coming from user.js model
            cb(null, false)
        } else{
            cb(null, user) // send it back up to check if user exist in sequelize database
        }
    })
    .catch(error => {
        console.log('*******Error*******')
        console.log(error)
    })
}))

module.export = passport;