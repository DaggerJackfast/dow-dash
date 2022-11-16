#!/bin/bash
set -e
docker_image="$1"
full_path=$(realpath $0)
scripts_path=$(dirname $full_path)
base_path=$(dirname $scripts_path)

cd $base_path
  IMAGE=${docker_image} docker-compose pull
  IMAGE=${docker_image} docker-compose --env-file=.env.production up -d
cd -

echo "frontend docker is started"
