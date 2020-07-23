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
            if(roles) {
                for(let rol of roles) {
                    if(req.user.Id_Roles.includes(rol)) return next();
                }
                return res.status(401).json({ error: "Usuario no posee los permisos necesarios" })
            }

            if(req.isAuthenticated()){
                return next();
            }

            return res.status(401).json({ error: "Usuario no autenticado" })
        }
    }
    
}