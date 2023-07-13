const { Router } = require('express');

const { get_all_aeropuertos, create_aeropuerto, update_aeropuerto, delete_aeropuerto, get_aeropuerto} = require('../controllers/Aeropuerto.Controller');
const router = Router();


router.route('/').get(get_all_aeropuertos) ;
router.route('/:id').get(get_aeropuerto) ;
router.route('/').post(create_aeropuerto);
router.route('/:id').patch(update_aeropuerto);
router.route('/:id').delete(delete_aeropuerto);

module.exports = router;