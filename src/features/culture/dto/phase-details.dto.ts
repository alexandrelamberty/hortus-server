import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CutlureLocation } from "../enum/culture-location.enum";
import { PhaseStatus } from "../enum/phase-status.enum";
import { SoilType } from "../enum/soil-type.enum";

/**
 * Enum class representing details about a phase in a cultivation process.
 */
export class PhaseDetails {
  /**
   * The status of the cultivation.
   *
   * This should be a member of the `PhaseStatus` enum.
   */
  @IsNotEmpty()
  @IsString()
  @IsEnum(PhaseStatus)
  status!: string;

  /**
   * The location of the cultivation.
   *
   * This should be a member of the `CutlureLocation` enum.
   */
  @IsNotEmpty()
  @IsString()
  @IsEnum(CutlureLocation)
  location!: string;

  /**
   * The soil type of the cultivation.
   *
   * This should be a member of the `SoilType` enum.
   */
  @IsEnum(SoilType)
  soil!: SoilType;

  /**
   * The quantity of the cultivation.
   *
   * This should be a number.
   */
  @IsNumber()
  quantity!: number;
}
