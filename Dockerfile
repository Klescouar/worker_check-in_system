FROM node:20-alpine AS base

RUN corepack enable
RUN corepack prepare pnpm@10.6.5 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/.env ./.env

EXPOSE 3000

CMD ["node", "server.js"]