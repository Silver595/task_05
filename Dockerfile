FROM node:latest

WORKDIR ./node_app

COPY . .

RUN npm i 

CMD ["npm","run","dev"]

