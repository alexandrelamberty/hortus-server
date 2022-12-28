import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { Types } from "mongoose";

import { PaginationParams } from "@common/paginationParams";

import { CreateCultureDto } from "../dto/create-culture.dto";
import { UpdateCultureDto } from "../dto/update-culture.dto";
import { PhaseStatus } from "../enum/phase-status.enum";
import { CultureService } from "../providers/culture.service";
import { Harvesting } from "../schemas/harvesting.schema";
import { Planting } from "../schemas/planting.schema";
import { Seeding } from "../schemas/seeding.schema";
import { Transplanting } from "../schemas/transplanting.schema";

//@UseGuards(JwtAuthGuard)
@Controller()
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Get("/cultures")
  listCultures(@Query() { page = 0, limit = 20 }: PaginationParams) {
    return this.cultureService.listCultures(page, limit);
  }

  @Post("/cultures")
  createCulture(@Body() createCultureDto: CreateCultureDto) {
    // FIXME: Default value move to service
    createCultureDto.seeding = new Seeding();
    createCultureDto.seeding.status = PhaseStatus.Pending;
    createCultureDto.transplanting = new Transplanting();
    createCultureDto.planting = new Planting();
    createCultureDto.harvesting = new Harvesting();
    const result = this.cultureService.createCulture(createCultureDto);
    return result;
  }

  @Get("/cultures/:id")
  readCulture(@Param("id") id: Types.ObjectId) {
    return this.cultureService.readCulture(id);
  }

  @Put("/cultures/:id")
  updateCulture(
    @Param("id") id: Types.ObjectId,
    @Body() updateCultureDto: UpdateCultureDto
  ) {
    return this.cultureService.updateCulture(id, updateCultureDto);
  }

  @Delete("/culture/:id")
  deleteCulture(@Param("id") id: Types.ObjectId) {
    return this.cultureService.deleteCulture(id);
  }

  @Delete("/cultures/multiple/:ids")
  deleteCultureByIds(@Param("ids") ids: string) {
    const aids = ids.split(",");
    aids.forEach((value) => {
      const validObjectId = Types.ObjectId.isValid(value);
      if (!validObjectId) {
        throw new BadRequestException("Invalid ObjectId");
      }
      const di: Types.ObjectId = Types.ObjectId(value);
      this.cultureService.deleteCulture(di);
    });
    return aids;
  }
}
