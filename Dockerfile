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
FROM node:16-alpine

ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install serve
RUN yarn global add serve@^13.0.2

# Copy builded files from builder
COPY --from=builder /opt/mapgenerator/dist dist/

CMD serve -l 3000 dist
