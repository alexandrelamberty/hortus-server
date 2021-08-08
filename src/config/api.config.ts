import { registerAs } from '@nestjs/config';

export default registerAs('api', () => ({
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
}));
