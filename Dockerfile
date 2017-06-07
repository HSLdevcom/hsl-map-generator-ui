FROM node:6

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
RUN npm run build

EXPOSE 3000

CMD npm run start-prod

