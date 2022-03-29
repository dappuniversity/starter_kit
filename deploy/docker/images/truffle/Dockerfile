FROM node:17

# Set work directory
WORKDIR /

# Copy dependencies files
COPY ./package.json \
    ./yarn.lock \
    ./.babelrc \
    /

# Install Truffle dependencies
RUN yarn install -g --production
RUN npm install -g truffle
RUN npm config set bin-links false

# Copy contract Files
COPY ./backend /backend

# Copy scripts and set execution permissions
COPY ./deploy/docker/images/truffle/truffle.sh /truffle.sh
COPY ./deploy/docker/images/truffle/truffle-test.sh /truffle-test.sh
RUN chmod +x /*.sh

# Default command to run when starting the container
ENTRYPOINT ./truffle.sh
