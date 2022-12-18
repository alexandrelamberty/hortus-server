import { Plant } from "../schemas/plant.schema";

export interface PlantResponse {
  plant: Plant;
}

export interface PlantsResponse {
  plants: Plant[];
  count: number;
}
