const pool = require('../DB/postgres');   



//Get all users
exports.get_all_equipos = async (req, res) => {

    const query = 'SELECT * FROM equipo';
    
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
