FROM node:14

WORKDIR /dalba-de/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

#CMD ["bash", "-c","npm install & npm run start:dev"]