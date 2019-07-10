#!/bin/bash
set -e

ORG=${ORG:-hsldevcom}
DOCKER_TAG=${TRAVIS_BUILD_NUMBER:-latest}
DOCKER_IMAGE=$ORG/hsl-map-generator-ui:${DOCKER_TAG}
DOCKER_IMAGE_LATEST=$ORG/hsl-map-generator-ui:latest

docker build --tag=$DOCKER_IMAGE_LATEST .
docker push $DOCKER_IMAGE_LATEST
