import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const now = Date.now()
  const method = req.method
  const url = req.url
  Logger.log(
    `${method} ${url}`,
    url
  )
  next();
}
