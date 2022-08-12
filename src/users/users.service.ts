import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  // FIXME: Pagination
  async findAll(skip = 0, limit?: number): Promise<any> {
    const query = this.userModel
      .find()
      .sort({ _id: 1 })
      .skip(parseInt(skip.toString()))

    if (limit) {
      query.limit(parseInt(limit.toString()))
    }
    const results = query
    const count = this.userModel.count()
    return { results, count }
  }

  async findById(id: string): Promise<User> {
    const result = this.userModel.findOne({ id: id }).exec();
    if (!result) throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
    return result;
  }

  async findByUsername(username: string): Promise<User> {
    const result = this.userModel.findOne({ username: username }).exec();
    if (!result) throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
    return result;
  }

  async findByEmail(email: string): Promise<User> {
    const result = this.userModel.findOne({ email: email }).exec();
    if (!result) throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
    return result;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    Logger.log("UserService", createUserDto)
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
    if (!result) throw new NotFoundException("User not found.")
    return result
  }

  async delete(id: string) {
    const result = this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException("User not found.")
    return result
  }
}
