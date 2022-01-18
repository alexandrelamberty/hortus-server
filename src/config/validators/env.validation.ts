import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsPort,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsDefined()
  @IsNotEmpty()
  @IsPort()
  API_PORT: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DATABASE_ROOT_USER: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DATABASE_ROOT_PASSWORD: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DATABASE_HOST: string;

  @IsDefined()
  @IsNotEmpty()
  @IsPort()
  DATABASE_PORT: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DATABASE_NAME: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DATABASE_USERNAME: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  DATABASE_URI: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  CACHE_HOST: string;

  @IsDefined()
  @IsNotEmpty()
  @IsPort()
  CACHE_PORT: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  CACHE_TTL: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  SESSION_HOST: string;

  @IsDefined()
  @IsNotEmpty()
  @IsPort()
  SESSION_PORT: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  SESSION_TTL: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRE: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  BCRYPT_HASH: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  UPLOAD_PATH: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
