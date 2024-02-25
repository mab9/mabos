# Stage 1: Compile and build
FROM node:latest as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve app with Nginx server
FROM nginx:alpine
# folder app is related to workdir in stage 1.
COPY --from=build /app/dist/mabos/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200

