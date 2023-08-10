const Refaccion= require('../models/Refacciones.Models')
const pool = require('../DB/postgres');   


//Get all Incidencias
exports.get_all_refacciones = async (req, res) => {

    const query = 'SELECT * FROM refaccion where isdeleted=FALSE order by idrefaccion';
    
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
        nombre,
        costo,
        fechaCosto,
        venta,
        fechaVenta,
        proveedor,
        equipos,

    } = req.body 

    try{
        const query = 'INSERT INTO refaccion(nombre, costo, fechacosto, venta, fechaventa, proveedor) values($1,$2,$3,$4,$5,$6) RETURNING idrefaccion;';

        // Create
        const response = await pool.query(query, [
            nombre,
            costo,
            fechaCosto,
            venta,
            fechaVenta,
            proveedor
        ]);

        const idRefaccion = response.rows[0].idrefaccion;

        let data = ''
        for(let i = 0; i < equipos.length; i++) {
            data += `(false,${idRefaccion},${equipos[i].idtipoequipo}),`
        }
        console.log(data)
        const queryCA = `INSERT INTO equipo_refacciones(isdeleted,idrefaccion,idtipoequipo, 568) values${data}`;
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

    const id = req.params.id;
    const query = 'UPDATE refaccion SET isdeleted=TRUE WHERE idrefaccion=$1;';

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
