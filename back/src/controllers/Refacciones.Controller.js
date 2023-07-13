const Refaccion= require('../models/Refacciones.Models')
const pool = require('../DB/postgres');   


//Get all Incidencias
exports.get_all_refacciones = async (req, res) => {

    const query = 'SELECT * FROM refaccion';
    
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
exports.create_refaccion = async (req, res) => {

    let {
        costo,
        fechaCosto,
        venta,
        fechaVenta,
        proveedor,
    } = req.body 

    try{
        const query = 'INSERT INTO refaccion(costo, fechacosto, venta, fechaventa, proveedor) values($1,$2,$3,$4,$5);';

        // Create
        const response = await pool.query(query, [
            costo,
            fechaCosto,
            venta,
            fechaVenta,
            proveedor
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
exports.update_refaccion = async(req, res) => {

        
    try{
        const updatedRefaccion = await Refaccion.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedRefaccion
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_refaccion = async(req, res) => {

    try{
        const updatedRefaccion = await Refaccion.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedRefaccion
            }
        })
    }catch(err){
        console.log(err)
    }

}