const { Router } = require('express');

const { get_all_incidencias, get_incidencia,create_incidencia, update_incidencia, delete_incidencia} = require('../controllers/Incidencia.Controller');
const router = Router();


router.route('/').get(get_all_incidencias);
router.route('/:id').get(get_incidencia);
router.route('/').post(create_incidencia);
router.route('/:id').put(update_incidencia);
router.route('/:id').patch(delete_incidencia);

module.exports = router;