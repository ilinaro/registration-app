import UserModel from "../models/user-model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { EmailExists } from "../utils/text-message";
import MailService from "./mail-service";
import TokenService from "./token-service";
import DtoService, { DtoServiceT } from "./dto-service";
import { TokenT } from "../types/registration";

class UserService {
  async registration(
    email: string,
    password: string
  ): Promise<({ user: DtoServiceT } & TokenT) | null> {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(EmailExists(email));
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    try {
      await MailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/active/${activationLink}`
      );
      const userDto = new DtoService({
        _id: user._id.toString(),
        email: user.email,
        isActivated: user.isActivated,
      });

      const tokens = TokenService.generateTokens({ ...userDto });
      if (!tokens) {
        throw new Error("WARNING: Error while generating access and refresh tokens");
      }

      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      return { user: userDto, ...tokens };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async login() {}
  async logout() {}
  async active() {}
  async refresh() {}
  async getUsers() {}
}

export default new UserService();
