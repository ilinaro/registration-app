import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TokenModel from "../models/token-model";
dotenv.config();

class TokenService {
  generateTokens(payload: string | Buffer | object) {
    if (
      !process.env.JWT_ACCESS_SECRET_KEY ||
      !process.env.JWT_REFRESH_SECRET_KEY
    ) {
      return null
    }

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

export default new TokenService();
