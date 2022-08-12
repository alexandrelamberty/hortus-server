import { HttpStatus, NotFoundException } from '@nestjs/common'
import { ObjectId, Types } from 'mongoose'

export default class SeedNotFoundException extends NotFoundException {
  constructor(objectId: Types.ObjectId) {
    super(`Seed with id ${objectId} not found`)
  }
}
