const express = require('express');
const router = express.Router();
const postController = require('../controller').postController;

router.get("/", postController.get);
router.get("/:id", postController.getById);
router.post("/", postController.save);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);


module.exports = router;