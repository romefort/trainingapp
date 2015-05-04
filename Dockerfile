FROM google/debian:wheezy

RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates
RUN mkdir /nodejs && curl http://nodejs.org/dist/v0.10.33/node-v0.10.33-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

ENV PATH $PATH:/nodejs/bin

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app
RUN npm install -g nodemon

EXPOSE 8080
ENTRYPOINT ["/nodejs/nodemon", "-x" , "bin/www"]
