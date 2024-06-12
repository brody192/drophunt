FROM oven/bun

WORKDIR /app

COPY /api/package.json ./
# COPY bun.lockb ./

RUN bun install --production

COPY /api/src ./src
COPY /api/tsconfig.json ./
# COPY /api/public public

ENV NODE_ENV production

EXPOSE 3000

CMD ["bun", "src/api.ts"]