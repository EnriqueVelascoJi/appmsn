const { Router } = require('express');

const { get_all_equipos,create_equipo, update_equipo, delete_equipo} = require('../controllers/Equipo.Controller');
const router = Router();


router.route('/').get(get_all_equipos);
router.route('/').post(create_equipo);
router.route('/:id').put(update_equipo);
router.route('/:id').patch(delete_equipo);

module.exports = router;