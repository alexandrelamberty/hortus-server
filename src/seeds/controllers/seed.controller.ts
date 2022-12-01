import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { CreateSeedDto } from "src/seeds/dto/create-seed.dto";
import { PaginationParams } from "../../common/paginationParams";
import { ParseObjectIdPipe } from "../../common/pipe/ParseObjectIdPipe";
import { UpdateSeedDto } from "../dto/update-seed.dto";
import { SeedService } from "../providers/seed.service";

@Controller("seeds")
// @UseInterceptors(CacheInterceptor)
export class SeedController {
  private readonly logger = new Logger(SeedController.name);

  constructor(private readonly seedService: SeedService) {}

  @Get("sow")
  listSeedsToSow(@Query() { skip = 0, limit = 10 }: PaginationParams) {
    return this.seedService.listSeedsToSow(skip, limit);
  }

  @Get()
  listSeeds(@Query() { skip = 0, limit = 10 }: PaginationParams) {
    return this.seedService.listSeeds(skip, limit);
  }

  @Post(":id/upload")
  @UseInterceptors(FileInterceptor("image"))
  picture(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
    @UploadedFile() file: Express.Multer.File
  ) {
    const seed = new UpdateSeedDto();
    seed.image = file.filename;
    return this.seedService.updateSeed(id, seed);
  }

  @Post()
  createSeed(@Body() body: CreateSeedDto) {
    this.logger.log("body", body);
    return this.seedService.createSeed(body);
  }

  @Get(":id")
  readSeed(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.seedService.readSeed(id);
  }

  @Put(":id")
  updateSeed(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateSeedDto
  ) {
    return this.seedService.updateSeed(id, body);
  }

  @Delete(":id")
  deleteSeed(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.seedService.deleteSeed(id);
  }

  @Delete("/multiple/:ids")
  deleteSeedByIds(@Param("ids") ids: string) {
    const aids = ids.split(",");
    aids.forEach((value) => {
      const validObjectId = Types.ObjectId.isValid(value);
      if (!validObjectId) {
        throw new BadRequestException("Invalid ObjectId");
      }
      const di: Types.ObjectId = Types.ObjectId(value);
      this.seedService.deleteSeed(di);
    });
    return aids;
  }
}
