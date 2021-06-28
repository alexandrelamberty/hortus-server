import { Plant } from '../../plants/schemas/plant.schema';

export class CreateCropDto {
  readonly plant: Plant;
}
