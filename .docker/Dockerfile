# Create a `dev`
FROM node:16-alpine as dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:16-alpine as prod
ARG NODE_ENV=prod
RUN echo "---------------- PRODUCTION ---------" 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=dev /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
