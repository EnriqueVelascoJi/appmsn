const Aeropuerto = require('../models/Aeropuerto.Model');
const pool = require('../DB/postgres');   



//Get all users
exports.get_all_aeropuertos = async (req, res) => {

    const query = 'SELECT * FROM aeropuerto where isdeleted=FALSE';
    
    // Get all aeropuertos
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
exports.get_aeropuerto = async (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM aeropuerto WHERE idaeropuerto=$1';
    
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
exports.create_aeropuerto= async (req, res) => {

    const data = req.body;
    const query = 'INSERT INTO aeropuerto(nombre,siglas) values($1,$2);';

    // Create
    const response = await pool.query(query, [
        data.nombre,
        data.siglas
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
exports.update_aeropuerto = async(req, res) => {
    const data = req.body;
    const id = req.params.id;
    const query = 'UPDATE aeropuerto SET nombre=$1,siglas=$2 WHERE idaeropuerto=$3;';

    // Create
    const response = await pool.query(query, [
        data.nombre,
        data.siglas,
        id
    ]);
        
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: req.body
    })
    .end()}

exports.delete_aeropuerto = async(req, res) => {


    const id = req.params.id;
    const query = 'UPDATE aeropuerto SET isdeleted=TRUE WHERE idaeropuerto=$1;';

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
