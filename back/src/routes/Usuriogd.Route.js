
const { Router } = require('express');

const { get_all_usuarios_gd, create_usuario_gd, update_usuario_gd, login_gd, get_usuario_gd} = require('../controllers/Usuario.Controller');
const router = Router();


router.route('/').get(get_all_usuarios_gd);
router.route('/:id').get(get_usuario_gd);
router.route('/').post(create_usuario_gd);
router.route('/login').post(login_gd);
router.route('/:id').patch(update_usuario_gd);


module.exports = router;
