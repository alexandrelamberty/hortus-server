import { Owner } from "../schemas/owner.schema";

export class CreateFoodDto {
  name: string;
}

export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
  readonly favFoods: CreateFoodDto;
  readonly owner: Owner;
}
