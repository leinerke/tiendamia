ARG nodeVersion=node:18.16.0-alpine

# Install dependencies only when needed
FROM ${nodeVersion} AS deps
RUN apk add --no-cache libc6-compat git
RUN mkdir -p /usr/src/api && chown -R node:node /usr/src/api
WORKDIR /usr/src/api
COPY --chown=node:node package.json yarn.lock ./
RUN ["yarn", "global", "add", "@nestjs/cli"]
RUN ["yarn", "install", "--ignore-scripts", "--frozen-lockfile"]

# Rebuild the source code only when needed
FROM ${nodeVersion} AS builder
WORKDIR /usr/src/api
COPY --from=deps /usr/src/api/node_modules ./node_modules
COPY --chown=node:node . .
ENV NODE_ENV production
RUN ["yarn", "build"]

# Production image, copy all the files and run next
FROM ${nodeVersion} AS runner
WORKDIR /usr/src/api
ENV NODE_ENV production
COPY --from=builder --chown=node:node /usr/src/api/dist ./dist
COPY --from=builder --chown=node:node /usr/src/api/node_modules ./node_modules
USER node
EXPOSE 3000
ENV PORT 3000
CMD ["node", "dist/main"]