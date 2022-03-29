# ---------------------------- Base Node ----------------------------

# Start from an official Node image
FROM node:17-alpine3.14 AS base

# Set work directory
WORKDIR /

# Install OS dependencies
RUN apk add --update \
    build-base \
    automake \
    libtool \
    pkgconf \
    nasm \
    && rm -rf /var/cache/apk/*

# Create log dir and files
RUN mkdir -p /logs

# ---------------------------- Dependencies ----------------------------

FROM base AS dependencies

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy dependencies files
COPY ./package.json \
    ./yarn.lock \
    ./.babelrc \
    /

# Install common dependencies
RUN yarn install -g --production
# TODO: Change to production=true when package.json dependencies are fixed


# ----------------------------- Local -----------------------------

FROM dependencies AS local

# Install dev dependencies
RUN yarn install -g

# Copy project code
COPY ./frontend /frontend
COPY ./backend/abis /backend/abis
COPY ./prisma /prisma

# Copy environment files
COPY ./.env.local /
# TODO: Use container ENV vars instead of .env file

# Generate prisma client
RUN yarn prisma:generate

# Default command to run when starting the container
CMD yarn prisma:migrate:prod && yarn start


# ------------------------------ Dev build ------------------------------

FROM dependencies AS dev-build

# Copy build dependencies
# COPY ./envs /envs

# Copy project code
COPY ./frontend /frontend
COPY ./backend/abis /backend/abis
COPY ./prisma /prisma

# Copy environment files
COPY ./.env.development /
# TODO: Use container ENV vars instead of .env file

# Build dev version
RUN yarn prisma:generate
RUN yarn build:dev

# ----------------------------- Development -----------------------------

FROM base AS development

# Copy run files
COPY --from=dev-build /node_modules /node_modules
COPY --from=dev-build /frontend/.next /frontend/.next
COPY --from=dev-build /frontend/public /frontend/public
COPY --from=dev-build /prisma /prisma
COPY --from=dev-build /package.json /package.json

# Copy scripts and set execution permissions
# COPY ./deploy/docker/images/frontend/frontend.sh /scripts/frontend.sh
# RUN chmod +x /scripts/*.sh

# Default command to run when starting the container
CMD yarn prisma:migrate:prod && yarn serve

# -------------------------------- Build --------------------------------

FROM dev-build AS build

# Copy environment files
COPY ./.env.production /
# TODO: Use container ENV vars instead of .env file

# Build prod version
RUN yarn prisma:generate
RUN yarn build:prod

# ------------------------------- Production -------------------------------

FROM base AS production

# Copy run files
COPY --from=build /node_modules /node_modules
COPY --from=build /frontend/.next /frontend/.next
COPY --from=build /frontend/public /frontend/public
COPY --from=build /prisma /prisma
COPY --from=build /package.json /package.json

# Copy scripts and set execution permissions
# COPY ./deploy/docker/images/frontend/frontend.sh /scripts/frontend.sh
# RUN chmod +x /scripts/*.sh

# Default command to run when starting the container
CMD yarn serve
