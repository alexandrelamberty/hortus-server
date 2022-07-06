import { HttpStatus, NotFoundException } from '@nestjs/common'
import { ObjectId } from 'mongoose'

export default class CultureNotFoundException extends NotFoundException {
  constructor(objectId: ObjectId) {
    super(`Culture with id ${objectId} not found`)
  }
}
