#!/bin/bash
/usr/sbin/nginx -g "daemon off;" & /etc/nginx/conf.d/reloadnginx.sh vehicle-admin
