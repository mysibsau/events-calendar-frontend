FROM node:14-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --silent

COPY . ./

# start app
# CMD ["npm", "start"]