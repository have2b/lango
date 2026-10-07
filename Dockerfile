# Step 1: Builder
FROM oven/bun:1.4.2-alpine AS builder

WORKDIR /app

# Angular CLI's SSR route extraction relies on Node's ESM loader hooks, so the build needs real Node
RUN apk add --no-cache nodejs

COPY package.json package-lock.json* bun.lock* ./
RUN bun install

COPY . .

# Produces dist/lango/browser (static assets) and dist/lango/server (SSR bundle)
RUN bun run build

# Step 2: Runner (slim production image)
FROM oven/bun:1.4.2-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# Hosts Angular SSR will serve (comma-separated); override with your real domain(s) at runtime
ENV NG_ALLOWED_HOSTS=localhost

# The SSR server bundle includes its dependencies, so only the build output is needed
COPY --from=builder --chown=bun:bun /app/dist/lango ./dist/lango

USER bun

EXPOSE 3000

CMD ["bun", "dist/lango/server/server.mjs"]
