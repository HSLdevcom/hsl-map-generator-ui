#!/bin/bash

set -e

ORG=${ORG:-hsldevcom}

read -p "Tag: " TAG

DOCKER_TAG=${TAG:-production}
DOCKER_IMAGE=$ORG/hsl-map-generator-ui:${DOCKER_TAG}
DOCKER_IMAGE_CYPRESS=ahjyrkia/generator-ui-e2e:${DOCKER_TAG}

docker build --build-arg BUILD_ENV=${TAG:-production} -t $DOCKER_IMAGE .
docker push $DOCKER_IMAGE

docker build --build-arg BUILD_ENV=${TAG} -t $DOCKER_IMAGE_CYPRESS -f e2e.dockerfile .
docker push $DOCKER_IMAGE_CYPRESS