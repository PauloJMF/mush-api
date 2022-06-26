FROM node:16-alpine

WORKDIR /home/app

COPY package*.json ./
RUN npm install
RUN npx prisma generate
COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
