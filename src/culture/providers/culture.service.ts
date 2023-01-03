import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Error, Model, Types } from "mongoose";
import { CreateHarvestDto } from "../../culture/dto/create-harvest.dto";
import { CreateCultureDto } from "../dto/create-culture.dto";
import { PhaseDetails } from "../dto/phase-details.dto";
import { UpdateCultureDto } from "../dto/update-culture.dto";
import { PhaseStatus } from "../enum/phase-status.enum";
import { CultureNotFoundException } from "../exceptions/cultures.exceptions";
import { Culture, CultureDocument } from "../schemas/culture.schema";

/**
 * Service class for interacting with a Culture model in a MongoDB database. It
 * provides several methods for querying and modifying cultures in the database.
 */
@Injectable()
export class CultureService {
  /**
   * Creates an instance of CultureService.
   * @param model Mongoose model for Culture+ documents.
   */
  constructor(
    @InjectModel(Culture.name)
    private readonly model: Model<CultureDocument>
  ) {}

  async findAll(page = 1, limit = 20): Promise<any> {
    const skip = (page - 1) * limit;
    const results = await this.model
      .find()
      .populate("seed")
      .skip(Number(skip))
      .limit(Number(limit))
      .exec();
    const count = await this.model.countDocuments();
    return { results, count };
  }

  async find(id: Types.ObjectId): Promise<Culture> {
    const result = await this.model.findOne({ _id: id }).exec();
    if (!result) throw new CultureNotFoundException(id);
    return result;
  }

  async create(createDto: CreateCultureDto): Promise<Culture> {
    let culture = await new this.model(createDto).save();
    culture = await culture.populate("seed").execPopulate();
    return culture;
  }

  async update(id: Types.ObjectId, updateDto: UpdateCultureDto) {
    const culture = await this.model
      .findByIdAndUpdate(id, updateDto, { new: true, runValidators: true })
      .exec();
    if (!culture) throw new CultureNotFoundException(id);
    await culture.populate("seed").execPopulate();
    return culture;
  }

  async delete(id: Types.ObjectId) {
    const result = await this.model.findByIdAndDelete(id).exec();
    if (!result) throw new CultureNotFoundException(id);
    return result;
  }

  /**
   * Start the sowing phase of a culture with detailed information.
   * @param id ID of the culture to start the phase.
   * @param info Phase details.
   * @returns Culture with the specified ID and phase started with details.
   * @throws {CultureNotFoundException} If the culture with the specified ID is not found.
   */
  async updateSowingPhase(id: Types.ObjectId, info: PhaseDetails) {
    let executeQuery;
    const skipQuery = {
      $set: {
        "seeding.status": PhaseStatus.Skipped,
      },
      "seeding.skippedAt": new Date(),
    };
    const stopQuery = {
      $set: {
        "seeding.status": PhaseStatus.Stopped,
      },
      "seeding.endedAt": new Date(),
    };
    const startQuery = {
      seeding: {
        status: PhaseStatus.Started,
        startedAt: new Date(),
        location: info.location,
        soil: info.soil,
        quantity: info.quantity,
      },
    };
    switch (info.status) {
      case PhaseStatus.Started:
        executeQuery = startQuery;
        break;
      case PhaseStatus.Skipped:
        executeQuery = skipQuery;
        break;
      case PhaseStatus.Stopped:
        executeQuery = stopQuery;
        break;
    }
    const culture = await this.model
      .findByIdAndUpdate(id, executeQuery, { new: true, runValidators: true })
      .exec();
    if (!culture) throw new CultureNotFoundException(id);
    await culture.populate("seed").execPopulate();
    return culture;
  }

  async updateTransplantingPhase(id: Types.ObjectId, info: PhaseDetails) {
    let executeQuery;
    const skipQuery = {
      $set: {
        "transplanting.status": PhaseStatus.Skipped,
      },
      "transplanting.skippedAt": new Date(),
    };
    const stopQuery = {
      $set: {
        "transplanting.status": PhaseStatus.Stopped,
      },
      "transplanting.endedAt": new Date(),
    };
    const startQuery = {
      transplanting: {
        status: PhaseStatus.Started,
        startedAt: new Date(),
        location: info.location,
        soil: info.soil,
        quantity: info.quantity,
      },
    };
    switch (info.status) {
      case PhaseStatus.Started:
        executeQuery = startQuery;
        break;
      case PhaseStatus.Skipped:
        executeQuery = skipQuery;
        break;
      case PhaseStatus.Stopped:
        executeQuery = stopQuery;
        break;
    }
    const culture = await this.model
      .findByIdAndUpdate(id, executeQuery, { new: true, runValidators: true })
      .exec();
    if (!culture) throw new CultureNotFoundException(id);
    await culture.populate("seed").execPopulate();
    return culture;
  }

  async updatePlantingPhase(id: Types.ObjectId, info: PhaseDetails) {
    let executeQuery;
    const skipQuery = {
      $set: {
        "planting.status": PhaseStatus.Skipped,
      },
      "planting.skippedAt": new Date(),
    };
    const stopQuery = {
      $set: {
        "planting.status": PhaseStatus.Stopped,
      },
      "planting.endedAt": new Date(),
    };
    const startQuery = {
      planting: {
        status: PhaseStatus.Started,
        startedAt: new Date(),
        location: info.location,
        soil: info.soil,
        quantity: info.quantity,
      },
    };
    switch (info.status) {
      case PhaseStatus.Started:
        executeQuery = startQuery;
        break;
      case PhaseStatus.Skipped:
        executeQuery = skipQuery;
        break;
      case PhaseStatus.Stopped:
        executeQuery = stopQuery;
        break;
    }
    const culture = await this.model
      .findByIdAndUpdate(id, executeQuery, { new: true, runValidators: true })
      .exec();
    if (!culture) throw new CultureNotFoundException(id);
    await culture.populate("seed").execPopulate();
    return culture;
  }

  async updateHarvestingPhase(id: Types.ObjectId, info?: PhaseDetails) {
    let executeQuery;
    const stopQuery = {
      $set: {
        "harvesting.status": PhaseStatus.Stopped,
      },
      "harvesting.endedAt": new Date(),
    };
    const startQuery = {
      harvesting: {
        status: PhaseStatus.Started,
        startedAt: new Date(),
      },
    };
    switch (info.status) {
      case PhaseStatus.Started:
        executeQuery = startQuery;
        break;
      case PhaseStatus.Stopped:
        executeQuery = stopQuery;
        break;
    }
    const culture = await this.model
      .findByIdAndUpdate(id, executeQuery, { new: true, runValidators: true })
      .exec();
    if (!culture) throw new CultureNotFoundException(id);
    await culture.populate("seed").execPopulate();
    return culture;
  }

  // FIXME: implementation with a phase parameter ?
  async skipPhase(id: Types.ObjectId, phase: string) {
    Logger.log(phase);
    const updateQuery = {
      "${phase}": {
        status: PhaseStatus.Skipped,
        skippedAt: new Date(),
      },
    };
    const culture = await this.model
      .findByIdAndUpdate(id, updateQuery, { new: true, runValidators: true })
      .exec();
    if (!culture) throw new CultureNotFoundException(id);
    await culture.populate("seed").execPopulate();
    return culture;
  }

  async updateHarvest(
    id: Types.ObjectId,
    dto: CreateHarvestDto
  ): Promise<Culture> {
    try {
      const culture = await this.model
        .findOneAndUpdate(
          { _id: id },
          {
            $push: {
              "harvesting.harvests": {
                quantity: dto.quantity,
                weight: dto.weight,
                date: dto.date,
              },
            },
            $inc: {
              "harvesting.quantity": dto.quantity,
              "harvesting.weight": dto.weight,
            },
          },
          { new: true }
        )
        .exec();
      return await culture.populate("seed").execPopulate();
    } catch (e: any) {
      Logger.log(e);
      throw new Error(e);
    }
  }

  async removeHarvest(
    id: Types.ObjectId,
    dto: CreateHarvestDto
  ): Promise<Culture> {
    try {
      const culture = await this.model
        .findOneAndUpdate(
          { _id: id },
          {
            $pull: {
              "harvesting.harvests": {
                quantity: dto.quantity,
                weight: dto.weight,
                date: dto.date,
              },
            },
            $inc: {
              "harvesting.quantity": -dto.quantity,
              "harvesting.weight": -dto.weight,
            },
          },
          { new: true }
        )
        .exec();
      return await culture.populate("seed").execPopulate();
    } catch (e: any) {
      Logger.log(e);
      throw new Error(e);
    }
  }
}
