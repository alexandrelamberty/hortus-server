import { IsEnum } from "class-validator";
import { PhaseStatus } from "../enum/phase-status.enum";

export class PhaseAction {
  @IsEnum(PhaseStatus)
  status: string;
}
