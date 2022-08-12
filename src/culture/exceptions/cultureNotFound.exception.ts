import { HttpStatus, NotFoundException } from '@nestjs/common'
import { ObjectId, Types } from 'mongoose'

export default class CultureNotFoundException extends NotFoundException {
  constructor(objectId: Types.ObjectId) {
    super(`Culture with id ${objectId} not found`)
  }
}
