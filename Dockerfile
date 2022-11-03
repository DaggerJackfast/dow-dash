FROM node:16.15.1-alpine

RUN mkdir /app/
WORKDIR /usr/share/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
