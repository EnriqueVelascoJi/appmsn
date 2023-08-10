const pool = require('../DB/postgres');   



//Get all users
exports.get_all_equipos = async (req, res) => {

    const query = `select e.idequipo,  e.equipo, e.noeconomico, e.marca, e.modelo, e.noserie, e.tipocombustible, e.enuso, e.motivo, e.isdeleted,
    a.nombre nombreaeropuerto, c.nombre nombrecliente 
    from equipo e 
    inner join cliente_aeropuerto ce 
    on e.idclienteaeropuerto = ce.idclienteaeropuerto
    inner join cliente c
    on c.idcliente = ce.idcliente
    inner join aeropuerto a
    on a.idaeropuerto = ce.idaeropuerto
    order by e.idequipo
    `;
    
    // Get all equipos
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
exports.get_equipo = async (req, res) => {

    const id = req.params.id;

    const query = `select e.idequipo,  e.equipo, e.noeconomico, e.marca, e.modelo, e.noserie, e.tipocombustible, e.enuso, e.motivo, e.isdeleted,
    a.nombre nombreaeropuerto, c.nombre nombrecliente, ce.idcliente, ce.idaeropuerto, ce.idclienteaeropuerto
    from equipo e 
    inner join cliente_aeropuerto ce 
    on e.idclienteaeropuerto = ce.idclienteaeropuerto
    inner join cliente c
    on c.idcliente = ce.idcliente
    inner join aeropuerto a
    on a.idaeropuerto = ce.idaeropuerto
    where e.idequipo=$1
    `;
    
    // Get all equipos
    const response = await pool.query(query,[id]);

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
exports.create_equipo= async (req, res) => {

    let {
        nombre,
          marca,
          modelo,
          noSerie,
          noEconomico,
          tipoCombustible,
          aeropuerto,
          motivo,
          enUso
    } = req.body
    const query = 'INSERT INTO equipo(equipo,noeconomico,marca,modelo,noserie,tipocombustible,enuso,motivo,idclienteaeropuerto) values($1,$2,$3,$4,$5,$6,$7,$8,$9);'

    // Create
    const response = await pool.query(query, [
        nombre,
        noEconomico,
        marca,
        modelo,
        noSerie,
        tipoCombustible,
        enUso,
        motivo,
        aeropuerto

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
exports.update_equipo = async(req, res) => {

        
    try{
        const updatedEquipo = await equipo.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedEquipo
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_equipo = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE equipo SET isdeleted=TRUE WHERE idcliente=$1;';

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
