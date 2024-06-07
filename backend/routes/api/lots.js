const express = require('express');
const ctrl = require("../../controllers/lots");

const {validateBody, isValidId, authenticate, avatarSize, upload} = require("../../middlewares");

const {schemas} = require("../../models/lot");
const router = express.Router();

router.get("/",  authenticate, ctrl.listLots);

router.get("/:id", authenticate, isValidId, ctrl.getLotById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addLot);

router.put("/:id", authenticate, isValidId, validateBody(schemas.changeSchema), ctrl.updateLot);

router.delete("/:id", authenticate, isValidId, ctrl.removeLot);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.schemaUpdateFavorite), ctrl.updateFavoriteLot);

router.patch("/avatars", authenticate, upload.single("avatar"), avatarSize, ctrl.updateLotAvatar);

console.log("I am running!");
module.exports = router;