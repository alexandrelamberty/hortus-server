import { Plant } from '../../plants/schemas/plant.schema';
import { Harvesting } from '../schemas/harvesting.schema ';
import { Planting } from '../schemas/planting.schema';
import { Seeding } from '../schemas/seeding.schema';
import { Transplanting } from '../schemas/transplanting.schema';

export class CreateCropDto {
  readonly plant: Plant;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly seeding: Seeding;
  readonly transplanting: Transplanting;
  readonly planting: Planting;
  readonly harvesting: Harvesting;
}
