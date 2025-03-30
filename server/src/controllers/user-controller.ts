import { Request, Response, NextFunction } from "express";


class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Registration failed" });
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