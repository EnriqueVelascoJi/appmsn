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




//Borrar despues
function newPassword () {
    
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    let password = "";

    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
       return password
    }
    
exports.create_usuario_gd = async (req, res) => {

    let {
        name,
      firstSurname,
      secondSurname,
      email,
      domain,
      subdomain,
      area,
      profile,
      isActive
    } = req.body 

    try{
        const query = 'INSERT INTO usuariogd(name,password,firstsurname,secondsurname,email,domain,subdomain,area,profile,isactive) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';
        const password = newPassword()
        // Create
        const response = await pool.query(query, [
            name,
            password, 
            firstSurname,
            secondSurname,
            email,
            domain,
            subdomain,
            area,
            profile,
            isActive
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
exports.update_usuario_gd = async(req, res) => {

        
    const data = req.body;
    const id = req.params.id;

    const query = 'UPDATE usuario SET name=$1, firstsurname=$2, secondsurname=$3, email=$4, domain=$5, subdomain=$6, area=$7, profile=$8, isactive=$9 WHERE id=$9;';

    // Create
    const response = await pool.query(query, [
        data.name,
        data.firstSurname,
        data.secondSurname,
        data.email,
        data.domain,
        data.subdomain,
        data.area,
        data.profile,
        data.isActive,
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
exports.get_all_usuarios_gd = async (req, res) => {

    const query = 'SELECT * FROM usuariogd where order by id';
    
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
exports.get_usuario_gd = async (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM usuariogd WHERE id=$1';
    
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
exports.login_gd = async(req, res) => {
    const userData = req.body

    
    //validar usuario
    if(userData.email && userData.contrasenia){
        const userf = await pool.query('SELECT * FROM usuariogd WHERE email=$1 AND password=$2',[userData.email,userData.password])
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
