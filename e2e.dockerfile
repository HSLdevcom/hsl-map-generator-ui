FROM cypress/browsers:node12.13.0-chrome78-ff70-brave78

ENV WORK /opt/mapgenerator

RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install Cypress and dependencies
COPY e2e.package.json ${WORK}/package.json
RUN yarn

COPY ./cypress/ ${WORK}/cypress/

COPY cypress.json ${WORK}

ARG BUILD_ENV=dev
ENV TEST_ENV=${BUILD_ENV}

COPY cypress.${BUILD_ENV}.json ${WORK}
ADD cypress.${BUILD_ENV}.json cypress.json

CMD yarn run cypress run -C cypress.json --record --key 1c1b0f31-9f00-4791-9361-7c2be8f9e631