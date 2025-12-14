import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/model/useModel";

export interface AuthRequest extends Request {
  user?: {
    username: string;
    role: string;
    id: string;
    email: string;
    password: string;
  };
}

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

class AuthMiddleware {
  async isAuthenticated(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authtoken = req.headers.authorization;
    if (!authtoken || authtoken === undefined) {
      res.status(403).json({
        message: "Token not available",
      });
      return;
    }
    jwt.verify(
      token,
      process.env.TOKEN as string,
      async (err, decoded: any) => {
        if (err) {
          res.status(403).json({
            message: "Invalid Token",
          });
        } else {
          try {
            const userData = await User.findByPk(decoded.id);
            if (!userData) {
              res.status(404).json({
                message: "User not available with that token",
              });
              return;
            }
            req.user = userData;
            next();
          } catch (error) {
            res.status(500).json({
              message: "Something went Wrong.",
            });
          }
        }
      }
    );
  }

  restricTo(...roles: Role[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      let userRole = req.user?.role as Role;
      if (!roles.includes(userRole)) {
        res.status(403).json({
          message: "You dont have permission.",
        });
      } else {
        next();
      }
    };
  }
}

export default new AuthMiddleware();
