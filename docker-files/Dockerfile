FROM node:20-alpine AS base-build
WORKDIR /app
COPY *.json ./
COPY index.html ./
COPY ./docker-files/vite.config.ts ./
COPY *.js ./
RUN npm install --force
COPY ./src /app/src
RUN npm run build 

FROM node:20-alpine AS client-dev
WORKDIR /app
COPY --from=base-build /app/node_modules ./node_modules
COPY --from=base-build /app/vite.config.ts /app/
COPY --from=base-build /app/index.html /app/
COPY --from=base-build /app/*.js /app/
COPY --from=base-build /app/*.json /app/
CMD ["npm","run","dev"]

FROM node:20-alpine AS final
WORKDIR /app 
COPY --from=base-build /app/node_modules ./node_modules
COPY --from=base-build /app/dist /app/dist
COPY --from=base-build /app/vite.config.ts /app/
COPY --from=base-build /app/*.json /app/
CMD ["npm","run","preview"]