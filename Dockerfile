# ---------- STAGE 1: Base ----------
FROM node:26-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- STAGE 2: Development (Hot-reload trong Docker) ----------
FROM base AS development
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# ---------- STAGE 3: Builder ----------
FROM base AS builder

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- STAGE 4: Production (Nginx serve static files) ----------
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]