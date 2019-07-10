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
RUN yarn build:dev

EXPOSE 3000

CMD yarn serve
