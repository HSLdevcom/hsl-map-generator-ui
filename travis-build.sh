#!/bin/bash
set -e

ORG=${ORG:-hsldevcom}
DOCKER_TAG=${TRAVIS_BUILD_NUMBER:-latest}
BUILD_ENV=production
BUILD_AND_PUSH_BRANCHES=('development', 'stage', 'master')

if [[ $TRAVIS_BRANCH == "development" ]]; then
  DOCKER_TAG=dev
  BUILD_ENV=dev

  echo "Building cypress test image with env -> dev and tag -> dev"

  DOCKER_IMAGE_CYPRESS=$ORG/generator-ui-e2e:dev
  docker build --build-arg BUILD_ENV=dev -t $DOCKER_IMAGE_CYPRESS -f e2e.dockerfile .

  if [[ $TRAVIS_PULL_REQUEST == "false" ]]; then
    echo "Pushing builded cypress test image to registry with tag -> dev"

    docker login -u $DOCKER_USER -p $DOCKER_AUTH
    docker push $DOCKER_IMAGE_CYPRESS
  fi
fi

if [[ $TRAVIS_BRANCH == "stage" ]]; then
  DOCKER_TAG=stage
  BUILD_ENV=stage
fi

if [[ $TRAVIS_BRANCH == "master" ]]; then
  DOCKER_TAG=production
  BUILD_ENV=production
fi

DOCKER_IMAGE=$ORG/hsl-map-generator-ui:${DOCKER_TAG}

echo "Building image with env -> ${BUILD_ENV} and tag -> ${DOCKER_TAG}"

docker build --build-arg BUILD_ENV=$BUILD_ENV --tag=$DOCKER_IMAGE .

if [[ $TRAVIS_PULL_REQUEST == "false" ]]; then
  if [[ " ${BUILD_AND_PUSH_BRANCHES[*]} " == *"$TRAVIS_BRANCH"* ]]; then
    echo "Pushing builded image to registry with tag -> ${DOCKER_TAG}"

    docker login -u $DOCKER_USER -p $DOCKER_AUTH
    docker push $DOCKER_IMAGE
  else
    echo "Pushed branch is not targeted environment branch (development, stage, master). Image is not pushed to registry"
  fi
else
  echo "Image is not pushed to registry for pull requests"
fi
