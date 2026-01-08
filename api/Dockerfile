FROM node:latest 

WORKDIR /app

RUN npm install -g prisma

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npx prisma db seed && node dist/server.js"]