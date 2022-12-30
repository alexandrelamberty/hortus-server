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
import { PaginationQueryParams } from "../../common/paginationParams";
import { ParseObjectIdPipe } from "../../common/pipe/ParseObjectIdPipe";
import { SharpPipe } from "../../common/pipe/SharpPipe";
import { CreateSeedDto } from "../../seeds/dto/create-seed.dto";
import { UpdateSeedDto } from "../dto/update-seed.dto";
import { SeedService } from "../providers/seed.service";
import { Seed, SeedDocument } from "../schemas/seed.schema";

/**
 * Controller class for managing requests to the seeds endpoint.
 */
@Controller("seeds")
export class SeedController {
  private readonly logger = new Logger(SeedController.name);

  constructor(private readonly seedService: SeedService) {}

  @Get("seedings")
  findAllToSow(
    @Query() { page = 0, limit = 10 }: PaginationQueryParams,
    @Query("start") start: number,
    @Query("end") end: number
  ) {
    return this.seedService.findAllToSow(start, end, page, limit);
  }

  @Get()
  findAll(@Query() { page = 1, limit = 10 }: PaginationQueryParams) {
    return this.seedService.findAll(page, limit);
  }

  @Get(":id")
  findById(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.seedService.findById(id);
  }

  @Post()
  create(@Body() body: CreateSeedDto) {
    this.logger.log(body);
    return this.seedService.create(body);
  }

  @Post(":id/upload")
  @UseInterceptors(FileInterceptor("image"))
  uploadImage(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
    @UploadedFile(SharpPipe) file: string
  ): Promise<SeedDocument> {
    this.logger.log(file);
    const seed = new UpdateSeedDto();
    seed.image = file;
    return this.seedService.update(id, seed);
  }

  @Put(":id")
  update(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateSeedDto
  ) {
    return this.seedService.update(id, body);
  }

  @Delete(":id")
  delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.seedService.deleteSeed(id);
  }

  @Delete("/multiple/:ids")
  deleteMany(@Param("ids") ids: string) {
    // FIXME: decorator to check ids and create deleteMany in service
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
