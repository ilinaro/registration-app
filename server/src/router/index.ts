import { Routers } from "../types/routers";
import userController from "../controllers/user-controller";
import express from "express";
import { body } from "express-validator";
import authMiddleware from "../middleware/auth-middleware";

const router = express.Router();

router.post(
  Routers.REGISTRATION,
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration,
);
router.post(Routers.LOGIN, userController.login);
router.post(Routers.LOGOUT, userController.logout);
router.get(Routers.ACTIVE, userController.active);
router.get(Routers.REFRESH, userController.refresh);
router.get(Routers.USERS, authMiddleware, userController.getUsers);

export default router;
