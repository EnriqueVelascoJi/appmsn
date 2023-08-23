const Incidencia= require('../models/Incidencia.Models')
const pool = require('../DB/postgres');


//Get all Incidencias
exports.get_all_incidencias = async (req, res) => {
      
    // const query = `
    // SELECT DISTINCT
    //     i.idincidencia,
    //     i.nombre,
    //     i.estatus,
    //     i.descripcion,
    //     i.comentario,
    //     i.ischeckwa,
    //     i.fecha,
    //     c.nombre nombrecliente ,
    //     a.nombre nombreaeropuerto
        
        
    // FROM
    //     incidencia i
    // INNER JOIN refacciones_incidencia ri
    //     ON i.idincidencia = ri.idincidencia
    //     INNER JOIN refaccion r
    //     ON ri.idrefaccion = r.idrefaccion
    //     INNER JOIN equipo_refacciones er
    //     ON r.idrefaccion = er.idrefaccion
    //     INNER JOIN equipo e
    //     ON er.idtipoequipo = e.idtipoequipo
    //     INNER JOIN cliente_aeropuerto ca
    //     ON e.idclienteaeropuerto = ca.idclienteaeropuerto
    //     INNER JOIN aeropuerto a
    //     ON ca.idaeropuerto = a.idaeropuerto
    //     INNER JOIN cliente c
    //     ON ca.idcliente = c.idcliente
        
    
        
    // `;
    const query = "SELECT * FROM incidencia where isdeleted=FALSE order by idincidencia"
    
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
exports.get_by_equipo = async (req, res) => {
      
    // const id= req.params.id
    const id= 13
        var response = await pool.query(`select r.idrefaccion, r.costo, r.fechacosto, r.venta, r.fechaventa, r.proveedor, r.isdeleted, r.nombre from equipo_refacciones er
        inner join refaccion r on er.idrefaccion = r.idrefaccion where er.idtipoequipo =$1;`, [ id ]);
      
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
exports.ver_mas = async (req, res) => {
      
    const id= req.params.id
        var response = await pool.query(`select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,  m.nombre mecaniconombre,
        c.nombre clientenombre, a.nombre aeropuertonombre, e.equipo, r.nombre, ri.nopiezas, ri.costo, ri.precioventa, r.nombre refaccionnombre
        from incidencia i
        inner join refacciones_incidencia ri  on i.idincidencia = ri.idincidencia
        inner join refaccion r on ri.idrefaccion = r.idrefaccion 
        inner join equipo_refacciones er on r.idrefaccion = er.idrefaccion
        inner join equipo e on er.idequipo = e.idequipo
        inner join cliente_aeropuerto ca on e.idclienteaeropuerto = ca.idclienteaeropuerto
        inner join aeropuerto a on ca.idaeropuerto = a.idaeropuerto
        inner join cliente c on ca.idcliente = c.idcliente
        inner join mecanico m on i.idmecanico = m.idmecanico where i.idincidencia=$1;`, [ id ]);
      
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
        fecha,
        refacciones
    } = req.body 

    // Resgistrar incidencia    
    var response = await pool.query(
        'INSERT INTO incidencia(nombre,estatus,descripcion,comentario,fecha,idmecanico) values($1,$2,$3,$4,$5,$6) RETURNING idincidencia;',
        [nombre, estatus, descripcion, comentario, fecha, idMecanico]
    )
    const idIncidenciaNew = response.rows[0].idincidencia;

    let data = ''
    for(let i = 0; i < refacciones.length; i++) {
        data += `(${refacciones[i].noPiezas},${refacciones[i].costo},${refacciones[i].precioVenta},false,${refacciones[i].refaccion},${idIncidenciaNew}),`
    }
    const queryRefacciones = `INSERT INTO refacciones_incidencia(nopiezas,costo,precioventa,isdeleted,idrefaccion,idincidencia) values${data}`;
    const parseQueryRefacciones = queryRefacciones.substring(0, queryRefacciones.length - 1);
    var response2 = await pool.query(parseQueryRefacciones);

    let dataToUpdtae = []
    for(let i = 0; i < refacciones.length; i++) {
        const query= `UPDATE refaccion set costo=${refacciones[i].costo}, venta=${refacciones[i].precioVenta} WHERE idrefaccion=${refacciones[i].refaccion};`
        dataToUpdtae.push(pool.query(query))
    }

    await Promise.all(dataToUpdtae);
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

    const id = req.params.id;
    const query = 'UPDATE incidencia SET isdeleted=TRUE WHERE idincidencia=$1;';

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
exports.get_resumen1 = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select ri.idrefaccionesincidencia, ri.nopiezas, ri.costo, ri.precioventa from incidencia i inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia where i.fecha >= $1 AND i.fecha < $2`
    console.log(date1)
   

    // Get all
    const response = await pool.query(query, [date1, date2]);

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
exports.get_resumen3 = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin,
        aeropuerto
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select ri.idrefaccionesincidencia, ri.nopiezas, ri.costo, ri.precioventa
    from incidencia i
    inner join refacciones_incidencia ri  on i.idincidencia = ri.idincidencia
    inner join refaccion r on ri.idrefaccion = r.idrefaccion 
    inner join equipo_refacciones er on r.idrefaccion = er.idrefaccion
    inner join equipo e on er.idequipo = e.idequipo
    inner join cliente_aeropuerto ca on e.idclienteaeropuerto = ca.idclienteaeropuerto
    inner join aeropuerto a on ca.idaeropuerto = a.idaeropuerto
    inner join cliente c on ca.idcliente = c.idcliente where i.fecha >= $1 AND i.fecha < $2 AND a.nombre = $3`
        console.log(date1)
   

    // Get all
    const response = await pool.query(query, [date1, date2, aeropuerto]);

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
exports.get_resumen2 = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin,
        equipo
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select ri.idrefaccionesincidencia, ri.nopiezas, ri.costo, ri.precioventa
    from incidencia i
    inner join refacciones_incidencia ri  on i.idincidencia = ri.idincidencia
    inner join refaccion r on ri.idrefaccion = r.idrefaccion 
    inner join equipo_refacciones er on r.idrefaccion = er.idrefaccion
    inner join equipo e on er.idequipo = e.idequipo
    inner join cliente_aeropuerto ca on e.idclienteaeropuerto = ca.idclienteaeropuerto
    inner join aeropuerto a on ca.idaeropuerto = a.idaeropuerto
    inner join cliente c on ca.idcliente = c.idcliente where i.fecha >= $1 AND i.fecha < $2 AND e.equipo = $3`
   

    // Get all
    const response = await pool.query(query, [date1, date2, equipo]);

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
exports.get_by_equipos = async (req, res) => {
      
    let {
        equipo
    } = req.body 

    const query = `select i.idincidencia, i.nombre, i.estatus, i.descripcion, i.comentario, i.ischeckwa, i.fecha, i.isdeleted, i.idmecanico
    from incidencia i
    inner join refacciones_incidencia ri  on i.idincidencia = ri.idincidencia
    inner join refaccion r on ri.idrefaccion = r.idrefaccion 
    inner join equipo_refacciones er on r.idrefaccion = er.idrefaccion
    inner join equipo e on er.idequipo = e.idequipo
    inner join cliente_aeropuerto ca on e.idclienteaeropuerto = ca.idclienteaeropuerto
    inner join aeropuerto a on ca.idaeropuerto = a.idaeropuerto
    inner join cliente c on ca.idcliente = c.idcliente where e.equipo = $1`
   

    // Get all
    const response = await pool.query(query, [equipo]);

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
exports.get_by_aeropuertos = async (req, res) => {
      
    let {
        aeropuerto
    } = req.body 

    const query = `select i.idincidencia, i.nombre, i.estatus, i.descripcion, i.comentario, i.ischeckwa, i.fecha, i.isdeleted, i.idmecanico
    from incidencia i
    inner join refacciones_incidencia ri  on i.idincidencia = ri.idincidencia
    inner join refaccion r on ri.idrefaccion = r.idrefaccion 
    inner join equipo_refacciones er on r.idrefaccion = er.idrefaccion
    inner join equipo e on er.idequipo = e.idequipo
    inner join cliente_aeropuerto ca on e.idclienteaeropuerto = ca.idclienteaeropuerto
    inner join aeropuerto a on ca.idaeropuerto = a.idaeropuerto
    inner join cliente c on ca.idcliente = c.idcliente where a.nombre = $1`
   

    // Get all
    const response = await pool.query(query, [aeropuerto]);

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
