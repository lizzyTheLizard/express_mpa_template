FROM node AS build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
RUN npm run build

FROM node
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --only=prod
COPY --from=build /usr/src/app/dist ./dist
ENV NODE_ENV production
EXPOSE 3000
CMD npm start