const pool = require('../DB/postgres');   


//Get all users
exports.get_all_usuarios = async (req, res) => {

    const query = 'SELECT * FROM usuario where isdeleted=FALSE order by idusuario';
    
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
exports.get_usuario = async (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM usuario WHERE idusuario=$1';
    
    // Get all aeropuertos
    const response = await pool.query(query, [id]);

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
        const query = 'INSERT INTO usuario(idcliente, nombre, apellido, email, telefono, contrasenia, tipousuario, aprobador, verificadorwa) values($1,$2,$3,$4,$5,$6,$7,$8,$9);';

        // Create
        const response = await pool.query(query, [
            cliente,
            nombre,
            apellido,
            email,
            telefono,
            password,
            tipoUsuario,
            aprobador,
            verificadorWA
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

        
    const data = req.body;
    const id = req.params.id;
    const query = 'UPDATE usuario SET nombre=$1, apellido=$2, email=$3, telefono=$4, contrasenia=$5, idcliente=$6, aprobador=$7, verificadorwa=$8 WHERE idusuario=$9;';

    // Create
    const response = await pool.query(query, [
        data.nombre,
        data.apellido,
        data.email,
        data.telefono,
        data.password,
        data.cliente,
        data.aprobador,
        data.verificadorWA,
        id
    ]);
        
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: req.body
    })
    .end()
}
exports.delete_usuario = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE usuario SET isdeleted=TRUE WHERE idusuario=$1;';

    // Create
    const response = await pool.query(query, [
        id
    ]);
        
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: req.body
    })

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
