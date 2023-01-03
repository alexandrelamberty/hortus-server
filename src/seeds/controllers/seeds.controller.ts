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
  Response,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response as Res } from "express";
import { Types } from "mongoose";
import { PaginationQueryParams } from "../../common/paginationParams";
import { ParseObjectIdPipe } from "../../common/pipe/ParseObjectIdPipe";
import { SharpPipe } from "../../common/pipe/SharpPipe";
import { CreateSeedDto } from "../dto/create-seed.dto";
import { QuerySeedParams } from "../dto/query-seed.dto";
import { UpdateSeedDto } from "../dto/update-seed.dto";
import { SeedDocument } from "../schemas/seed.schema";
import { SeedsService } from "../seeds.service";

/**
 * Controller class for managing requests to the seeds endpoint.
 */
@Controller("seeds")
export class SeedsController {
  private readonly logger = new Logger(SeedsController.name);

  constructor(private readonly seedService: SeedsService) {}

  @Get("seedings")
  getAllSeedsToSow(
    @Query() { page = 1, limit = 10 }: PaginationQueryParams,
    @Query("start") start: number,
    @Query("end") end: number
  ) {
    return this.seedService.getAllSeedsToSow(start, end, page, limit);
  }

  @Get()
  async getAllSeeds(
    @Query() query: QuerySeedParams,
    @Response() res: Res
  ): Promise<any> {
    const results = await this.seedService.getAllSeeds(query);
    return res
      .set({
        "Pagination-Count": results.count,
        "Pagination-Page": query.page,
        "Pagination-Limit": query.limit,
        "Content-Type": "application/json",
      })
      .json(results.results);
  }

  @Get(":id")
  getSeedById(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.seedService.getSeedById(id);
  }

  @Post()
  createSeed(@Body() body: CreateSeedDto) {
    return this.seedService.createSeed(body);
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
    return this.seedService.updateSeed(id, seed);
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
  deleteManySeeds(@Param("ids") ids: string) {
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
