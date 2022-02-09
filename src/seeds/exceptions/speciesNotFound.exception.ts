import { HttpStatus, NotFoundException } from '@nestjs/common'
import { ObjectId } from 'mongoose'

export default class SpeciesNotFoundException extends NotFoundException {
  constructor(objectId: ObjectId) {
    super(`Species with id ${objectId} not found`)
  }
}
