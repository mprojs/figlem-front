#!/bin/bash

touch /var/log/nginx/access.log

echo "Starting sshd..."
/usr/sbin/sshd -D&

nginx&

tail -f /var/log/nginx/access.log
