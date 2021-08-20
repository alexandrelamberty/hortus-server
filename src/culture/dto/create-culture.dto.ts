import { Crop } from '../../crop/schemas/crop.schema';
import { Harvesting } from '../schemas/harvesting.schema ';
import { Planting } from '../schemas/planting.schema';
import { Seeding } from '../schemas/seeding.schema';
import { Transplanting } from '../schemas/transplanting.schema';

export class CreateCultureDto {
  readonly crop: Crop;
  readonly seeding: Seeding;
  readonly transplanting: Transplanting;
  readonly planting: Planting;
  readonly harvesting: Harvesting;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
