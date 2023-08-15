const { Router } = require('express');

const { get_all_equipos,create_equipo, update_equipo, delete_equipo, get_equipo, get_all_tipos_equipos, get_equipo_by_clienteaeropuerto} = require('../controllers/Equipo.Controller');
const router = Router();


router.route('/').get(get_all_equipos);
router.route('/tipoequipos').get(get_all_tipos_equipos);
router.route('/equipos/:id').get(get_equipo_by_clienteaeropuerto); 
router.route('/:id').get(get_equipo);
router.route('/').post(create_equipo);
router.route('/:id').patch(update_equipo);
router.route('/:id').patch(delete_equipo);

module.exports = router;
