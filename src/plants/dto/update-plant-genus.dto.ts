import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantGenusDto } from './create-plant-genus.dto';

export class UpdatePlantGenusDto extends PartialType(CreatePlantGenusDto) {}
