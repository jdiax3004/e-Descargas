// Pass this function to protect the GET URLs as a second param
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        res.status(401).json({ error: "Usuario no autenticado" })
    },

    isAuth: (roles) => {
        return (req, res, next) => {
            if(roles.includes(req.user.Id_Rol)) {
                return next();
            }
            res.send("Usuario no autorizado")
        }
    }
    
}