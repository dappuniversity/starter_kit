FROM trufflesuite/ganache-cli:latest

# Set work directory
WORKDIR /

RUN /bin/sh -c "apk add --no-cache bash"

# Copy scripts and set execution permissions
COPY ./deploy/docker/images/ganache/ganache.sh /ganache.sh
RUN chmod +x /ganache.sh

ENTRYPOINT ./ganache.sh
