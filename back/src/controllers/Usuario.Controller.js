const Usuario= require('../models/Usuario.Model')
const pool = require('../DB/postgres');   


//Get all users
exports.get_all_usuarios = async (req, res) => {

    const query = 'SELECT * FROM usuario';
    
    // Get all
    const response = await pool.query(query);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()
}
exports.create_usuario = async (req, res) => {

    let {
        idCliente,
        nombre,
        apellido,
        email,
        telefono,
        password,
        tipoUsuario,
        aprobador,
        verificadorWA,
        cliente
    } = req.body 

    try{
        const query = 'INSERT INTO usuario(idcliente, nombre, apellido, email, telefono, contrasenia, tipousuario, aprobador, verificadorwa, idcliente) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';

        // Create
        const response = await pool.query(query, [
            idCliente,
            nombre,
            apellido,
            email,
            telefono,
            password,
            tipoUsuario,
            aprobador,
            verificadorWA,
            cliente
        ]);
            
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
    }catch(err){
        console.log(err)
    }
}
exports.update_usuario = async(req, res) => {

        
    try{
        const updatedUser = await Usuario.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedUser
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_usuario = async(req, res) => {

    try{
        const updatedCliente = await Cliente.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedCliente
            }
        })
    }catch(err){
        console.log(err)
    }

}
exports.login = async(req, res) => {
        const userData = req.body
    
        
        //validar usuario
        if(userData.email && userData.contrasenia){
            const userf = await pool.query('SELECT * FROM usuario WHERE email=$1 AND contrasenia=$2',[userData.email,userData.contrasenia])
            if(userf.rows.length == 1) {
      
    
              //Log in usuario
              res.json({
                status: "success",
                msg: "Login exitoso.",
                data: userf.rows[0]
              }).end()
      
            } else {
                res.json({
                    status: "error",
                    msg: "Credenciales invalidas.",
                    data: {}
                  }).end()
            }

      
        }else{
            res.json({
                status: "error",
                msg: "Credenciales invalidas.",
                data: {}
              }).end()        }
      

      
}
