import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * Log the
 * @param req 
 * @param res 
 * @param next 
 */
export function logger(req: Request, res: Response, next: NextFunction) {
  const now = Date.now()
  const method = req.method
  const url = req.url
  Logger.log(
    `[${method}] ${url} ${Date.now() - now}ms`,
    "LoggerMiddleware",

  )
  next();
}
