function authUser(req, res, next) {
    if (req.res == null) {
        res.status(403)
        return res.send('Niste prijavljeni v aplikacijo!')
    }
    next()
}


function authRole(admin) {
    return (req, res, next) => {
        if (req.user.admin !== admin) {
            res.status(401)
            return res.send('Nimate dostopa!')
        }

        next()
    }
}

module.exports = {
    authUser,
    authRole
}
