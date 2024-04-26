import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "¡Por favor, ingrese a su cuenta!!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}
export const adminOnly = async (req, res, next) =>{
    try {
        // Verificar si el usuario está autenticado
        if (!req.session.userId) {
            return res.status(401).json({msg: "¡Por favor, ingrese a su cuenta!"});
        }

        // Buscar al usuario en la base de datos usando el uuid de la sesión
        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });

        // Si el usuario no se encuentra, devolver un error de usuario no encontrado
        if (!user) {
            return res.status(404).json({msg: "Usuario no encontrado"});
        }

        // Verificar si el usuario tiene el rol de administrador
        if (user.role !== "admin") {
            return res.status(403).json({msg: "Acceso Prohibido"});
        }

 // Si todo está bien, asignar el ID y el rol del usuario a req.userId y req.role
 req.userId = user.id;
 req.role = user.role;
 
 // Pasar al siguiente middleware
 next();
} catch (error) {
 // Manejar cualquier error
 res.status(500).json({msg: error.message});
}
};

export const receptionistOnly = async (req, res, next) => {
try {
 // Verificar si el usuario está autenticado
 if (!req.session.userId) {
     return res.status(401).json({msg: "¡Por favor, ingrese a su cuenta!"});
 }
 // Buscar al usuario en la base de datos usando el uuid de la sesión
 const user = await User.findOne({
     where: {
         uuid: req.session.userId
     }
 });
 // Si el usuario no se encuentra, devolver un error de usuario no encontrado
 if (!user) {
     return res.status(404).json({msg: "Usuario no encontrado"});
 }
 // Verificar si el usuario tiene el rol de recepcionista
 if (user.role !== "recepcion") {
     return res.status(403).json({msg: "Acceso Prohibido"});
 }
 // Si es recepcionista, verificar si la sucursal de la solicitud coincide con la sucursal del usuario
 if (req.params.branch && user.branch !== req.params.branch) {
     return res.status(403).json({msg: "Acceso Prohibido a esta sucursal"});
 }
 // Si todo está bien, asignar el ID y el rol del usuario a req.userId y req.role
 req.userId = user.id;
 req.role = user.role;
 // Pasar al siguiente middleware
 next();
} catch (error) {
    // Manejar cualquier error
    res.status(500).json({msg: error.message});
    }
};