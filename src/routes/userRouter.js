const express = require('express');
const router = express.Router();
const userController = require('../controller').userController;


router.post("/", userController.save);
router.get("/", userController.get);



module.exports = router;