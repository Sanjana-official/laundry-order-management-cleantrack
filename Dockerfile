# Dockerfile
# Multi-stage build — keeps the image lean

# ── Stage 1: Install dependencies ──────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ── Stage 2: Production image ───────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Copy deps and app source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Don't run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server/index.js"]