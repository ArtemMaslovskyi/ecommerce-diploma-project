const express = require('express');
const ctrl = require("../../controllers/lots");

const {validateBody, isValidId, authenticate, avatarSize, upload} = require("../../middlewares");

const {schemas} = require("../../models/lot");
const router = express.Router();

router.get("/", ctrl.listLots);

router.get("/:id", isValidId, ctrl.getLotById);

router.post("/", validateBody(schemas.addSchema), ctrl.addLot);

router.put("/:id", isValidId, validateBody(schemas.changeSchema), ctrl.updateLot);

router.delete("/:id", isValidId, ctrl.removeLot);

router.patch("/:id/favorite", isValidId, validateBody(schemas.schemaUpdateFavorite), ctrl.updateFavoriteLot);

// router.patch("/pictures", authenticate, upload.single("picture"), avatarSize, ctrl.updateLotPicture);

console.log("I am running!");
module.exports = router;