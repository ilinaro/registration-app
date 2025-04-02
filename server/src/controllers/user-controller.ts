import { Request, Response, NextFunction } from "express";
import { ErrorMessages } from "../utils/text-message";
import UserService from "../service/user-service";

class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        console.error(
          "WARNING: ",
          ErrorMessages.WRONG_PASS_OR_EMAIL,
          password,
          email,
        );
        res.status(400).json({ message: ErrorMessages.WRONG_PASS_OR_EMAIL });
        return;
      }

      const userData = await UserService.registration(email, password);

      if (!userData) {
        console.error(ErrorMessages.USER_NOT_FOUND);
        res.status(400).json({ message: ErrorMessages.USER_NOT_FOUND });
        return;
      }

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
      return;
    } catch (e) {
      console.error(ErrorMessages.REGISTRATION_FAILED, e);
      res.status(500).json({ message: ErrorMessages.REGISTRATION_FAILED });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Login endpoint" });
    } catch (e) {
      console.error(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Logout endpoint" });
    } catch (e) {
      console.error(e);
    }
  }

  async active(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Active endpoint" });
    } catch (e) {
      console.error(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Refresh endpoint" });
    } catch (e) {
      console.error(e);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ users: [123] });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  }
}

export default new UserController();
