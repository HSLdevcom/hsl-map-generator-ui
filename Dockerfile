FROM node:16-alpine as builder

ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install app dependencies
COPY package.json yarn.lock ${WORK}/
RUN yarn install && yarn cache clean

# Bundle app source
COPY . ${WORK}

ARG BUILD_ENV=prod
COPY .env.${BUILD_ENV} ${WORK}/.env

RUN yarn build


# The actual image comes here
FROM node:12-alpine

ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install serve from app dependencies
COPY package.json yarn.lock ${WORK}/
RUN npm install serve --no-save

# Copy builded files from builder
COPY --from=builder /opt/mapgenerator/dist dist/

CMD npm run serve
