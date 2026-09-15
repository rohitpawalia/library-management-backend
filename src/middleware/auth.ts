import { Request, Response, NextFunction } from "express";


export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  if (header !== "Bearer admin123") {
    return res.status(403).json({
      message: "Invalid token"
    });
  }

  next();
}