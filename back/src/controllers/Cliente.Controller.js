const Cliente = require('../models/Cliente.Model')
const pool = require('../DB/postgres');   


//Get all users
exports.get_all_clientes = async (req, res) => {

    const query = 'SELECT * FROM cliente';
    
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
        descripcion
    } = req.body 

    try{
        const query = 'INSERT INTO cliente(nombre, descripcion) values($1,$2);';

        // Create
        const response = await pool.query(query, [
            nombre,
            descripcion
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