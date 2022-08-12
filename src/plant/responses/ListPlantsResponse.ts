import { Plant } from "../schemas/plant.schema";

export class ListPlantsResponse {
    results: Plant[]
    count: number
}