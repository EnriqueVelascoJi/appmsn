const { Router } = require('express');

const { get_all_mecanicos, create_mecanico, update_mecanico, delete_mecanico} = require('../controllers/Mecanico.Controller');
const router = Router();


router.route('/').get(get_all_mecanicos);
router.route('/').post(create_mecanico);
router.route('/:id').put(update_mecanico);
router.route('/:id').patch(delete_mecanico);

module.exports = router;