
const { Router } = require('express');

const { get_all_usuarios_gd, create_usuario_gd, update_usuario_gd, login_gd, get_usuario_gd, create_project_gd, get_projects_gd, get_partial_projects_gd, get_all_notifications_gd, get_notifications_by_user_gd } = require('../controllers/Usuario.Controller');
const router = Router();


router.route('/').get(get_all_usuarios_gd);
router.route('/usuariogd/:id').get(get_usuario_gd);
router.route('/').post(create_usuario_gd);
router.route('/login').post(login_gd);
router.route('/:id').patch(update_usuario_gd);
router.route('/project').post(create_project_gd);
router.route('/projects').get(get_projects_gd);
router.route('/partialprojects').get(get_partial_projects_gd);
router.route('/notifications').get(get_all_notifications_gd);
router.route('/notifications/:id').get(get_notifications_by_user_gd);





module.exports = router;