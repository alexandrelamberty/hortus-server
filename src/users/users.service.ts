import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import e from "express";
import { RegisterUserDto } from "../auth/dtos/register-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<UserDocument>
  ) {}

  async findOne(email: string): Promise<UserDocument> {
    const result = await this.model.findOne({ email: email }).exec();
    if (!result) throw new NotFoundException(email);
    return result;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const result = await this.model.findOne({ email: email }).exec();
    if (!result) throw new NotFoundException(email);
    return result;
  }

  async register(user: RegisterUserDto): Promise<UserDocument> {
    const result = await this.model.findOne({ email: user.email }).exec();
    if (!result) throw new NotFoundException(user.email);
    return result;
  }
}
