FROM node:6

ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install app dependencies and bundle app source
COPY . ${WORK}
RUN npm install
RUN npm run build

EXPOSE 4000

CMD npm run start-prod

