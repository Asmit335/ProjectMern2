import { Request, Response } from "express";
import User from "../database/model/useModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email) {
      res.status(404).json({
        message: "Please fill all the details",
      });
      return;
    }
    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role,
    });
    res.status(200).json({
      message: "User registered Successfully.",
    });
    return;
  }

  public static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({
        message: "Please fill all the field.",
      });
      return;
    }
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });
    if (!data) {
      res.status(404).json({
        message: "No user found with the given email.",
      });
      return;
    }
    const isMatchedPassword = bcrypt.compareSync(password, data.password);
    if (!isMatchedPassword) {
      res.status(403).json({
        message: "Invalid Email or Password.",
      });
      return;
    }
    //token generate
    const token = jwt.sign({ id: data.id }, process.env.TOKEN as string, {
      expiresIn: "10d",
    });
    res.status(200).json({
      message: "Logged In Success.",
      data: token,
    });
  }
}
export default AuthController;
