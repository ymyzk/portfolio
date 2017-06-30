#!/bin/bash
set -eu

client=true
server=false

debug=true
production=false

params=()

for opt in "$@"; do
  case "$opt" in
    '--client' )
      client=true
      server=false
      ;;
    '--server' )
      client=false
      server=true
      ;;
    '--debug' )
      debug=true
      production=false
      ;;
    '--production' )
      debug=false
      production=true
      ;;
    *)
      params+=( "$1" )
      ;;
  esac
  shift 1
done

echo "Client: $client / Server: $server"
echo "Debug: $debug / Production: $production"

# TODO: specify optional parameters
# echo "Parameters: ${params[@]}"

set -eux

if $debug && $client; then
  webpack
elif $debug && $server; then
  # Build server
  webpack --env.server
  mv build/debug/server/public/server.js* build/debug/server/
  mv build/debug/server/public/stats.json build/debug/server/stats.server.json
  # Copy files for clients
  cp build/debug/client/bundle.*.js* build/debug/server/public/
  cp build/debug/client/stats.json build/debug/server/stats.client.json
elif $production && $client; then
  webpack --env.production
elif $production && $server; then
  # Build server
  webpack --env.production --env.server
  mv build/production/server/public/server.js* build/production/server/
  mv build/production/server/public/stats.json build/production/server/stats.server.json
  # Copy files for clients
  cp build/production/client/bundle.*.js* build/production/server/public/
  cp build/production/client/stats.json build/production/server/stats.client.json
else
  echo "unexpected error"
fi
