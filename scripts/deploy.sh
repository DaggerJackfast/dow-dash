#!/bin/bash
set -e

cloudflare_account_id=$1
cloudflare_api_token=$2
project_name=$3

[ -z "$cloudflare_account_id" ] && exit "Empty cloudflare account id"
[ -z "$cloudflare_api_token" ] && exit "Empty cloudflare api token"
[ -z "$project_name" ] && echo "Empty project name"

full_path=$(realpath $0)
scripts_path=$(dirname $full_path)
base_path=$(dirname $scripts_path)

export_dir=./out

cd $base_path
  branch_name=$(git rev-parse --abbrev-ref HEAD)
  latest_commit_hash=$(git rev-parse HEAD)
  npm install
  npm run build
  npm run export
  CLOUDFLARE_ACCOUNT_ID=${cloudflare_account_id} CLOUDFLARE_API_TOKEN=${cloudflare_api_token} npx wrangler pages publish --commit-hash=${latest_commit_hash} --project-name=${project_name} --branch=${branch_name} ${export_dir}
cd -

echo "frontend is successfully deployed to cloudflare pages"
