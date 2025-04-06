import { Request, Response, NextFunction } from "express";
import { ErrorMessages } from "../utils/text-message";
import UserService from "../service/user-service";
import { logger } from "../utils/logger";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error";
class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(
          ApiError.BadRequest(
            ErrorMessages.WRONG_PASS_OR_EMAIL,
            errors.array(),
          ),
        );
      }
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);

      if (!userData) return;

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
      return;
    } catch (e) {
      logger.error("catch on registration", e);
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      if (!userData) return;
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
      return;
    } catch (e) {
      logger.error("catch on login", e);
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = UserService.logout(refreshToken);
      res.json(token);
      return;
    } catch (e) {
      logger.error("catch on logout", e);
      next(e);
    }
  }

  async active(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await UserService.active(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      logger.error("catch on active", e);
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      if (!userData) return;
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      logger.error("catch on refresh", e);
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
      return;
    } catch (e) {
      logger.error("catch on getUsers", e);
      next(e);
    }
  }
}

export default new UserController();
