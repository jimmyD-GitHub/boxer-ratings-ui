FROM node:latest
MAINTAINER Jimmy Dixon <jamesalandixon@gmail.com>

LABEL Description = "Single page application UI for boxeratings.com"

RUN apt-get update && apt-get upgrade \
    && apt-get install --assume-yes -yqq curl nginx

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#S6
RUN curl -sL "https://github.com/just-containers/s6-overlay/releases/download/v1.16.0.0/s6-overlay-amd64.tar.gz" \
    | tar xz -C /

#Services
COPY docker/s6/services.d /etc/services.d
COPY docker/s6/init.sh /etc/cont-init.d/init.sh

WORKDIR /var/www/boxer-ratings-ui/
COPY . /var/www/boxer-ratings-ui/

COPY docker/nginx/default /etc/nginx/sites-available/default

COPY docker/docker-entrypoint.sh /usr/local/bin/
RUN ln -s /usr/local/bin/docker-entrypoint.sh / # backwards compat
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN npm install && npm run build

EXPOSE 80

CMD ["/init"]