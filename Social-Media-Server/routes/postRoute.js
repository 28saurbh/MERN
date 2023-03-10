const router = require("express").Router();
const postController = require('../controllers/postController')
const requireuser = require('../middlewares/requireUser')

router.get('/getAllPost', requireuser, postController.getAllPostController);
router.post('/', requireuser, postController.createPostController);
router.post('/like', requireuser, postController.likeAndUnlikePost);
router.put('/', requireuser, postController.updatePostController);
router.delete('/', requireuser, postController.deletePost);

module.exports = router