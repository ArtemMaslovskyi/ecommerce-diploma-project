const router = require('express').Router();
const ctrl = require("../../controllers/lots");

const {validateBody, isValidId, authenticate, avatarSize, upload} = require("../../middlewares");

const {schemas} = require("../../models/lot");

router.get("/list", authenticate, ctrl.listLots);

router.get("/:id", authenticate, isValidId, ctrl.getLotById);

router.post("/create", authenticate, validateBody(schemas.addSchema), ctrl.addLot);

router.put("/:id", authenticate, isValidId, validateBody(schemas.changeSchema), ctrl.updateLot);

router.delete("/:id", authenticate, isValidId, ctrl.removeLot);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.schemaUpdateFavorite), ctrl.updateFavoriteLot);

router.patch("/pictures", authenticate, upload.single("picture"), avatarSize, ctrl.updateLotPicture);

console.log("Lots running!");
module.exports = router; 