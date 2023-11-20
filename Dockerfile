FROM node:18.17.1-alpine AS builder

ARG VER_NAME
ARG VER_TS

ENV NEXT_PUBLIC_VER_NAME=${VER_NAME}
ENV NEXT_PUBLIC_VER_TS=${VER_TS}

WORKDIR /build
COPY ./ ./
RUN npm ci && npm run build

###############################################################################

FROM node:18.17.1-alpine AS final

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

WORKDIR /app
COPY --from=builder /build/.next/standalone ./
COPY --from=builder /build/.next/static ./.next/static
COPY --from=builder /build/public ./public

CMD ["node", "server.js"]
