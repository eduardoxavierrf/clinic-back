import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import AppError from '../error/AppError'

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}

export default function ensureAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('JWT token missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, process.env.SECRET_KEY)

        const { sub } = decoded as TokenPayload

        request.user = {
            id: sub,
        }

        return next()
    } catch {
        throw new AppError('JWT token missing', 401)
    }
}
