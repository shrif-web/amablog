import express from "express"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model"

export const authorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let accessToken = req.cookies.jwt

    if (!accessToken) {
        return res.status(403).json({
            message: "No authorization token provided"
        })
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid authorization token"
            })
        }

        req.user = User.find(user)[0]
        next()
    })
}
