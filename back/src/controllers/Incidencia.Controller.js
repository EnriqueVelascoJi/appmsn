const Incidencia= require('../models/Incidencia.Models')
const pool = require('../DB/postgres');


//Get all Incidencias
exports.get_all_incidencias = async (req, res) => {
      
    const query = `
    SELECT DISTINCT
        i.idincidencia,
        i.nombre,
        i.estatus,
        i.descripcion,
        i.comentario,
        i.ischeckwa,
        i.fecha,
        c.nombre nombrecliente ,
        a.nombre nombreaeropuerto
        
        
    FROM
        incidencia i
    INNER JOIN refacciones_incidencia ri
        ON i.idincidencia = ri.idincidencia
        INNER JOIN refaccion r
        ON ri.idrefaccion = r.idrefaccion
        INNER JOIN equipo_refacciones er
        ON r.idrefaccion = er.idrefaccion
        INNER JOIN equipo e
        ON er.idtipoequipo = e.idtipoequipo
        INNER JOIN cliente_aeropuerto ca
        ON e.idclienteaeropuerto = ca.idclienteaeropuerto
        INNER JOIN aeropuerto a
        ON ca.idaeropuerto = a.idaeropuerto
        INNER JOIN cliente c
        ON ca.idcliente = c.idcliente
        
    
        
    `;
    
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
exports.get_incidencia = async (req, res) => {
      
    const id= req.params.id
        var response = await pool.query('SELECT * FROM incidencia WHERE idincidencia=$1;', [ id ]);
      
        if(response.rows.length == 0){
            console.log('error')
        }
      
        res.status(201)
            .json({
                  status: "success",
                  msg: "Incidencia",
                  data: response.rows
                })
                .end()

      
}
exports.create_incidencia = async (req, res) => {

    let {
        idMecanico,
        nombre,
        estatus,
        descripcion,
        comentario,
        fecha
    } = req.body 

    // Resgistrar incidencia    
    var response = await pool.query(
        'INSERT INTO incidencia(nombre,estatus,descripcion,comentario,fecha,idmecanico) values($1,$2,$3,$4,$5,$6) RETURNING idincidencia;',
        [nombre, estatus, descripcion, comentario, fecha, idMecanico]
    )
    console.log(response.rows)
    
    res
    .status(201)
    .json({
        status: "success",
        msg: "Resgitro de usuario exitoso.",
        data: req.body
    })
    .end()

   

}
exports.update_incidencia = async(req, res) => {

        
    try{
        const updatedIncidencia = await Incidencia.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedIncidencia
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_incidencia = async(req, res) => {

    try{
        const updatedIncidencia = await Incidencia.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedIncidencia
            }
        })
    }catch(err){
        console.log(err)
    }

}
