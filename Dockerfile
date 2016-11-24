FROM node:6

ARG PORT=3000
ENV PORT ${PORT}
ENV WORK /opt/mapgenerator

# Create app directory
RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install app dependencies and bundle app source
COPY . ${WORK}
RUN npm install
RUN npm run build

EXPOSE ${PORT}

CMD npm run start-prod

