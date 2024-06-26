const router = require("express").Router();

const ctrl = require("../../controllers/users");

const {validateBody, authenticate, upload, avatarSize} = require("../../middlewares");

const {schemas} = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), avatarSize, ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrl.emailVerification);

router.post("/verify", validateBody(schemas.emailVerifySchema), ctrl.reVerify);

console.log("Users running!");

module.exports = router;