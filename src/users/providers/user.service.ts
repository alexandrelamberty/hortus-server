import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User, UserDocument } from "../schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async getAll(
    skip = 0,
    limit?: number
  ): Promise<{ users: User[]; count: number }> {
    const query = this.userModel.find().skip(parseInt(skip.toString()));

    if (limit) {
      query.limit(parseInt(limit.toString()));
    }
    const result = await query;
    const count = await this.userModel.count();
    return { users: result, count: count };
  }

  async findById(id: string): Promise<User> {
    const result = this.userModel.findOne({ id: id }).exec();
    return result;
  }

  async findByEmail(email: string): Promise<User> {
    const result = this.userModel.findOne({ email: email }).exec();
    return result;
  }

  async insert(user: CreateUserDto): Promise<User> {
    const returnPlant = await this.userModel.create(user);
    return returnPlant;
  }

  async update(id: string, user: UpdateUserDto) {
    const result = this.userModel.findByIdAndUpdate(id, user).exec();
    return result;
  }

  async delete(id: string): Promise<any> {
    const result = this.userModel.findByIdAndDelete(id).exec();
    return result;
  }
}
