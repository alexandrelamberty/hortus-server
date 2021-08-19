import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
  ttl: process.env.CACHE_TTL,
}));
