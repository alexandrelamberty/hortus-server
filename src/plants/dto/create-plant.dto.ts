export class CreatePlantDto {
  readonly name: string;
  readonly family: string;
  readonly genus: string;
  readonly description: string;
  readonly image: string;
  readonly seeding: number[];
  readonly transplanting: number[];
  readonly planting: number[];
  readonly harvesting: number[];
  readonly spacing: number;
  readonly rows: number;
}
