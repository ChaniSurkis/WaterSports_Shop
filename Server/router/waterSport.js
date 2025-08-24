const express = require('express');
const router = express.Router();
const controllerWaterSport = require('../controller/waterSport')


router.get("/", controllerWaterSport.get)

router.get("/:id",controllerWaterSport.getById)
router.delete("/:id",controllerWaterSport.deleteP)
router.put("/:productId/:quantity",controllerWaterSport.updateProductStock)
// router.get("/:id", controllerWaterSport.getById);
// router.post("/", controllerWaterSport.post);

module.exports = router;