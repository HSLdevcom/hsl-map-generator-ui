FROM node:18-alpine as builder

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

ARG DIGITRANSIT_APIKEY
ENV REACT_APP_DIGITRANSIT_APIKEY=${DIGITRANSIT_APIKEY}

RUN yarn build


# The actual image comes here
FROM node:18-alpine

ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install serve
RUN yarn global add serve@^14.2.0

# Copy builded files from builder
COPY --from=builder /opt/mapgenerator/dist dist/

CMD serve -l 3000 dist
