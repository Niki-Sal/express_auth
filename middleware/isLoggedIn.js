function isLoggedIn(req, res, next){
    if(!req.user){
        req.flash('error', 'you must be signedin to acess page')
    } else{
        next()
    }
}
module.export = isLoggedIn