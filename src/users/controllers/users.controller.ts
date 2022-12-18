import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PaginationParams } from "src/common/paginationParams";
import { ParseObjectIdPipe } from "src/common/pipe/ParseObjectIdPipe";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UsersService } from "../providers/users.service";
import { UsersResponse } from "../responses/users.responses";
import { User } from "../schemas/user.schema";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(@Query() query: PaginationParams): Promise<UsersResponse> {
    const result = await this.usersService.getAll(query);
    return result;
  }

  @Get("/:id")
  getById(@Param("id", ParseObjectIdPipe) id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  insert(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.insert(user);
  }

  @Patch()
  update(
    @Param("id", ParseObjectIdPipe) id: string,
    @Body() user: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete("/:id")
  delete(@Param("id", ParseObjectIdPipe) id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
