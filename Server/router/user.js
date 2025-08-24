const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/user')

router.post("/login", controllerUser.login);
router.get("/", controllerUser.get);
router.post("/", controllerUser.post);
router.get("/:id", controllerUser.getById);

module.exports = router;