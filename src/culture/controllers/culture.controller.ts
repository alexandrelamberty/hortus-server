import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Response,
} from "@nestjs/common";
import { Types } from "mongoose";
import { PaginationQueryParams } from "../../common/paginationParams";
import { ParseObjectIdPipe } from "../../common/pipe/ParseObjectIdPipe";
import { CreateHarvestDto } from "../../culture/dto/create-harvest.dto";
import { CreateCultureDto } from "../dto/create-culture.dto";
import { PhaseDetails } from "../dto/phase-details.dto";
import { UpdateCultureDto } from "../dto/update-culture.dto";
import { CultureService } from "../providers/culture.service";
import { Culture } from "../schemas/culture.schema";
import { Response as Res } from "express";
/**
 * Controller class for managing requests to the culture endpoint.
 */
@Controller("cultures")
export class CultureController {
  constructor(private readonly cultureService: CultureService) {}

  @Get()
  async findAll(@Query() query: PaginationQueryParams, @Response() res: Res) {
    const results = await this.cultureService.findAll(query.page, query.limit);
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
  async findById(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.cultureService.find(id);
  }

  @Post()
  async create(@Body() createCultureDto: CreateCultureDto) {
    const result = this.cultureService.create(createCultureDto);
    return result;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateCultureDto: UpdateCultureDto
  ): Promise<Culture> {
    return this.cultureService.update(id, updateCultureDto);
  }

  @Delete(":id")
  async delete(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.cultureService.delete(id);
  }

  @Delete("multiple/:ids")
  async deleteMany(@Param("ids") ids: string) {
    // FIXME: decorator to check ids and create deleteMany in service
    const aids = ids.split(",");
    aids.forEach((value) => {
      const validObjectId = Types.ObjectId.isValid(value);
      if (!validObjectId) {
        throw new BadRequestException("Invalid ObjectId");
      }
      const di: Types.ObjectId = Types.ObjectId(value);
      this.cultureService.delete(di);
    });
    return aids;
  }

  // Add decorator to switch between action request
  // and validate the appropriate fields passed.
  // @UseInterceptors(PhaseIntercerptor)
  @Patch(":id/sowing")
  async updateSowingPhaseState(
    @Param("id") id: Types.ObjectId,
    @Body() phase: PhaseDetails
    // @CulturePhaseDecorator() info: PhaseAction
  ) {
    return this.cultureService.updateSowingPhase(id, phase);
  }

  @Patch(":id/transplanting")
  async updateTransplantingPhaseState(
    @Param("id") id: Types.ObjectId,
    @Body() info: PhaseDetails
  ) {
    return this.cultureService.updateTransplantingPhase(id, info);
  }

  @Patch(":id/planting")
  async updatePlantingPhaseState(
    @Param("id") id: Types.ObjectId,
    @Body() info: PhaseDetails
  ) {
    return this.cultureService.updatePlantingPhase(id, info);
  }

  @Patch(":id/harvesting")
  async updateHarvestingPhaseState(
    @Param("id") id: Types.ObjectId,
    @Body() info: PhaseDetails
  ) {
    return this.cultureService.updateHarvestingPhase(id, info);
  }

  @Patch(":id/harvesting/harvests")
  async updateHarvestingHarvests(
    @Param("id") id: Types.ObjectId,
    @Body() harvest: CreateHarvestDto
  ) {
    switch (harvest.action) {
      case "push":
        return this.cultureService.updateHarvest(id, harvest);
        break;
      case "pull":
        return this.cultureService.removeHarvest(id, harvest);
        break;
    }
  }
}
