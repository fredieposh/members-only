const { Router } = require("express");
const commentController = require('../controllers/commentController.js')

const commentRouter = Router();

commentRouter.post('/:id', commentController.postAddComment);

module.exports = commentRouter;