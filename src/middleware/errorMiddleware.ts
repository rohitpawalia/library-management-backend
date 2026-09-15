import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    return res.status(500).json({
        message: "Something went wrong"
    });
};

export default errorMiddleware;