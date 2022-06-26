FROM node:16-slim
RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /home/app

COPY package*.json ./
RUN npm install
RUN npx prisma generate
COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
