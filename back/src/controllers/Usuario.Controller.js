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

    const query = 'UPDATE usuario SET name=$1, firstsurname=$2, secondsurname=$3, email=$4, domain=$5, subdomain=$6, area=$7, profile=$8, isactive=$9 WHERE id=$10;';

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

    const query = 'SELECT * FROM usuariogd order by id';
    
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
    if(userData.email && userData.password){
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
exports.create_project_gd = async(req, res) => {

    let {
        projectName,
        projectType,
        projectDescription ,
        projectScopeDescription,
        projectObjective,
        region,
        startDate,
        finalDate,
        userId 
    } = req.body 

    try{
        const query = 'INSERT INTO projectgd(projectName,projecttype,projectdescription,projectscopedescription,projectobjective,region,startdate,finaldate) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;';

        // Create
        const response = await pool.query(query, [
            projectName,
            projectType,
            projectDescription ,
            projectScopeDescription,
            projectObjective,
            region,
            startDate,
            finalDate   
        ]);

        const idProject = response.rows[0].id;
        const queryProcess = 'INSERT INTO processgd(name,idproject,idrequirement,idstatus,idusuario) values($1,$2,$3,$4,$5);';

        // Create
        const responseProcess = await pool.query(queryProcess, [
            'Gestión de proyecto | iniciaiva',
            idProject,
            null,
            2,
            userId


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

exports.get_projects_gd = async (req, res) => {

    const query = 'select * from processgd pgd inner join projectgd prgd on pgd.idproject = prgd.id inner join requirementgd rgd on pgd.idrequirement = rgd.idinner join usuariogd ugd  on pgd.idusuario = ugd.idorder by id';
    
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
exports.get_partial_projects_gd = async (req, res) => {

    const query = 'select * from processgd pgd inner join projectgd prgd on pgd.idproject = prgd.id inner join usuariogd ugd  on pgd.idusuario = ugd.id order by id';
    
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
exports.notificate = async(req, res) => {

    let {
        iddUserSend,
        idUserReceiver
    } = req.body 

    try{
        const query = 'INSERT INTO notificationgd(idUserSend,idUserReceiver) values($1,$2) RETURNING id;';

        // Create
        const response = await pool.query(query, [
            iddUserSend,
            idUserReceiver 
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
exports.get_all_notifications_gd = async (req, res) => {

    const query = 'SELECT * FROM notificationgd order by id';
    
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
exports.get_notifications_by_user_gd = async (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM usuariogd WHERE idusersend=$1';
    
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



