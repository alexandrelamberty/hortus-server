export default () => ({
  base_url: process.env.API_URL,
  port: parseInt(process.env.API_PORT, 10) || 3333,
  mongo: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    uri: process.env.DATABASE_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  redis: {
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
    ttl: process.env.CACHE_TTL,
  },
  session: {
    host: process.env.SESSION_HOST,
    port: process.env.SESSION_PORT,
    ttl: process.env.SESSION_TTL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_EXPIRE,
  },
});
