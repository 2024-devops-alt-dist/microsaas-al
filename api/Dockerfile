FROM node:24-alpine AS build

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma

RUN npm run build

FROM node:24-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/src/infrastructure/database/prisma ./src/infrastructure/database/prisma

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]