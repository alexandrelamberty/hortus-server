export default () => ({
  base_url: process.env.BASE_URL,
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: {
    host: process.env.MONGO_CONNECTION,
  },
  redis: {
    host: process.env.MONGO_CONNECTION,
  },
});
