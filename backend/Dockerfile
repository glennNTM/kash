# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
# pnpm est fourni via corepack ; la version est épinglée par le champ
# "packageManager" du package.json (reproductibilité).
RUN corepack enable
WORKDIR /app

#  Dépendances complètes (dev incluses) : base du build et du mode dev 
FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

#  Compilation TypeScript → dist 
FROM deps AS build
COPY tsconfig.json ./
COPY src ./src
RUN pnpm build

#  Dépendances de production 
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

#  Image finale
FROM node:22-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# `node` : utilisateur non privilégié déjà présent dans l'image officielle.
USER node
EXPOSE 8000
CMD ["node", "dist/index.js"]

#  Stage dev : hot reload via tsx (la source est montée en volume par compose) 
FROM deps AS dev
ENV NODE_ENV=development
EXPOSE 8000
CMD ["pnpm", "dev"]
