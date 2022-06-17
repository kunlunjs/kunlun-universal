# base node image
FROM node:16.15.1-alpine as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /kunlun-universal

# ADD package.json package-lock.json ./
ADD package.json ./
# RUN npm install --production=false
RUN npx pnpm i

# Setup production node_modules
FROM base as production-deps

WORKDIR /kunlun-universal

COPY --from=deps /kunlun-universal/node_modules /kunlun-universal/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /kunlun-universal

COPY --from=deps /kunlun-universal/node_modules /kunlun-universal/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /kunlun-universal

COPY --from=production-deps /kunlun-universal/node_modules /kunlun-universal/node_modules
COPY --from=build /kunlun-universal/node_modules/.prisma /kunlun-universal/node_modules/.prisma

COPY --from=build /kunlun-universal/build /kunlun-universal/build
COPY --from=build /kunlun-universal/public /kunlun-universal/public
ADD . .

CMD ["npm", "start"]
