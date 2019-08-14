FROM node:8

ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install app dependencies
COPY package.json ${WORK}
COPY yarn.lock ${WORK}
RUN yarn install

# Bundle app source
COPY . ${WORK}

ARG BUILD_ENV=production
COPY .env.${BUILD_ENV} ${WORK}/.env

RUN yarn build

CMD yarn serve
