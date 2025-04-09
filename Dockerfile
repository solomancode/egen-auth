FROM node:20-alpine

WORKDIR /app

COPY . .


RUN yarn install 

RUN npm i -g turbo 
RUN turbo build

RUN npm i -g next
RUN npm i -g pm2 

CMD ["pm2-runtime", "ecosystem.config.js"]
