FROM node:20.12.0-slim as base

# ===============================
# Builder
# ===============================
FROM base as builder
WORKDIR /app
# Install deps
RUN npm install -g pnpm@8.15.6
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
# Build source
COPY . .
RUN --mount=type=secret,id=NEXT_PUBLIC_HOST \
    NEXT_PUBLIC_HOST="$(cat /run/secrets/NEXT_PUBLIC_HOST)" \
    pnpm ci:build
# Remove dev deps
RUN pnpm prune --prod

# ===============================
# Runner
# ===============================
FROM base as runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME 0.0.0.0
# Get source
RUN mkdir .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Config workspace
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tuphan
RUN chown -R tuphan:nodejs /app
USER tuphan
EXPOSE 3000
# Run server
CMD node server.js
