import { Routers } from "../types/routers";
import userController from "../controllers/user-controller";
import express from "express";

const router = express.Router();

router.post(Routers.REGISTRATION, userController.registration);
router.post(Routers.LOGIN, userController.login);
router.post(Routers.LOGOUT, userController.logout);
router.get(Routers.ACTIVE, userController.active);
router.get(Routers.REFRESH, userController.refresh);
router.get(Routers.USERS, userController.getUsers);

export default router;
