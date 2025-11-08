ARG UBUNTU_RELEASE=24.04
ARG CHISEL_VERSION=v1.1.0

FROM node:24-alpine AS app-builder
WORKDIR /app

# Copy package manifests first to leverage Docker cache
COPY package*.json ./

# Install dependencies (use npm ci when lockfile exists for reproducible builds)
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

# Copy source and build
COPY . .
RUN npm run build

# Do chisel work
FROM ubuntu:$UBUNTU_RELEASE AS builder
ARG TARGETARCH UBUNTU_RELEASE CHISEL_VERSION
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

ADD "https://github.com/canonical/chisel/releases/download/${CHISEL_VERSION}/chisel_${CHISEL_VERSION}_linux_${TARGETARCH}.tar.gz" \
    chisel.tar.gz

RUN tar -xvf chisel.tar.gz -C /usr/bin/

RUN mkdir /staging-rootfs \
    && chisel cut --release "ubuntu-$UBUNTU_RELEASE" --root /staging-rootfs \
        base-files_base \
        ca-certificates_data \
        nginx_bins \
    # ensure www-data user/group exist in the staged rootfs so nginx can drop privileges
    && printf 'www-data:x:82:82:www-data:/var/www:/usr/sbin/nologin\n' >> /staging-rootfs/etc/passwd \
    && printf 'www-data:x:82:\n' >> /staging-rootfs/etc/group \
    && mkdir -p /staging-rootfs/var/www \
    && chown -R 82:82 /staging-rootfs/var/www || true

FROM scratch

COPY --from=builder /staging-rootfs /
COPY --from=app-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

# FROM nginx:stable-alpine

# # Copy built static files from builder
# COPY --from=app-builder /app/dist /usr/share/nginx/html

# # Replace default nginx config with one that supports SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
