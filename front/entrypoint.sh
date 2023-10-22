#!/bin/sh

set -eu

API_URL=${API_URL:-http://changeme}

sed -i "s|__API_URL__|${API_URL}|g" /usr/share/nginx/html/static/js/*.js

exec "$@"