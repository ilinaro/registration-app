import UserModel from "../models/user-model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ErrorMessages } from "../utils/text-message";
import MailService from "./mail-service";
import TokenService from "./token-service";
import DtoService from "./dto-service";
import { TokenT } from "../types/registration";
import ApiError from "../exceptions/api-error";
import { logger } from "../utils/logger";

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(ErrorMessages.EMAIL_EXISTS);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/active/${activationLink}`
    );
    const userDto = new DtoService(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async active(activationLink: string) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest(ErrorMessages.NOT_CORRECT_LINK);
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(ErrorMessages.USER_NOT_FOUND);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(ErrorMessages.WRONG_PASS_OR_EMAIL);
    }

    const userDto = new DtoService(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens };
  }
  async logout(refreshToken: string) {
    const token = TokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById((userData as DtoService).id);

    const userDto = new DtoService({ user });

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens };
  }
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export default new UserService();
