const Mecanico = require('../models/Mecanico.Models')
const pool = require('../DB/postgres');   


//Get all users
exports.get_all_mecanicos = async (req, res) => {

    const query = 'SELECT * FROM mecanico';
    
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
exports.create_mecanico= async (req, res) => {

    let {
        nombre,
        fechaIngreso
    } = req.body 

    try{
        const query = 'INSERT INTO mecanico(nombre, fechaingreso) values($1,$2);';

        // Create
        const response = await pool.query(query, [
            nombre,
            fechaIngreso
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
exports.update_mecanico = async(req, res) => {

        
    try{
        const updatedMecanico = await Mecanico.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedMecanico
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_mecanico = async(req, res) => {

    try{
        const updatedMecanico = await Mecanico.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedMecanico
            }
        })
    }catch(err){
        console.log(err)
    }
    
}