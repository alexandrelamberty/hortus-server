import { PartialType } from '@nestjs/mapped-types';
import { CreateVarieteDto } from './create-variete.dto';

export class UpdateVarieteDto extends PartialType(CreateVarieteDto) {}
