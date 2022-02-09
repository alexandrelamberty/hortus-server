import { HttpStatus, NotFoundException } from '@nestjs/common'
import { ObjectId } from 'mongoose'

export default class SeedNotFoundException extends NotFoundException {
  constructor(objectId: ObjectId) {
    super(`Seed with id ${objectId} not found`)
  }
}
