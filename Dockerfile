FROM 172.17.0.1:5555/igor/figlem:base

ADD . /app

# install frontend
RUN cd /app && \
    node --max-old-space-size=3072 ./node_modules/@angular/cli/bin/ng build --prod

WORKDIR /app

CMD ["/entrypoint.sh"]
