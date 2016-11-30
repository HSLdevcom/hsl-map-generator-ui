FROM node:6

ARG PORT=3000
ENV PORT ${PORT}
ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install app dependencies
COPY package.json ${WORK}
RUN npm install

# Bundle app source
COPY . ${WORK}
RUN npm run build

EXPOSE ${PORT}

CMD npm run start-prod

