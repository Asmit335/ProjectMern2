import { Request, Response } from "express";
import User from "../database/model/useModel";

class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(404).json({
        message: "Please fill all the details",
      });
      return;
    }

    await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      message: "User registered Successfully.",
    });
    return;
  }
}
export default AuthController;
