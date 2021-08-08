export default () => ({
  base_url: process.env.BASE_URL,
  port: parseInt(process.env.PORT, 10) || 3333,
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    uri: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: process.env.REDIS_TTL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
