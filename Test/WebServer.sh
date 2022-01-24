#!/bin/sh

clear


# Root = Repository Root Folder

root=$(dirname "$0")
root="$root/.."

server="$root/Test/WebServer.js"
import="$root/Test/Imports.json"


deno run                    \
    --allow-net             \
    --allow-read            \
    --importmap "$import"   \
    "$server"
