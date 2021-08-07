import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantFamilyDto } from './create-plant-family.dto';

export class UpdatePlantFamilyDto extends PartialType(CreatePlantFamilyDto) {}
