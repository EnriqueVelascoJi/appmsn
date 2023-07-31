const Cliente = require('../models/Cliente.Model')
const pool = require('../DB/postgres');   


//Get all users
exports.get_all_clientes = async (req, res) => {

    const query = 'SELECT * FROM cliente where isdeleted=FALSE order by idcliente';
    
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
exports.create_cliente= async (req, res) => {

    let {
        nombre,
        descripcion,
        aeropuertos
    } = req.body 

    try{
        const query = 'INSERT INTO cliente(nombre, descripcion) values($1,$2);';

        // Create
        const response = await pool.query(query, [
            nombre,
            descripcion
        ]);
    const idCliente = response.rows[0].idcliente;

    let data = ''
    for(let i = 0; i < aeropuertos.length; i++) {
        data += `(false,${idCliente},${aeropuertos[i].idaeropuerto}),`
    }
    const queryCA = `INSERT INTO cliente_aeropuerto(isdeleted,idcliente,idaeropuerto) values${data}`;
    const parseQueryCA = queryCA.substring(0, queryCA.length - 1);
    var response2 = await pool.query(parseQueryCA);
            
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
exports.update_cliente = async(req, res) => {

        
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
exports.delete_cliente = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE cliente SET isdeleted=TRUE WHERE idcliente=$1;';

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
