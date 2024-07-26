FROM node:22.5.1 AS build

WORKDIR /opt/app

COPY yarn.lock package.json ./

RUN yarn install --configuration production

COPY . .

RUN yarn run build --configuration production

FROM nginx:1.27.0

COPY --from=build /opt/app/dist/ostock-angular/browser /usr/share/nginx/html

EXPOSE 80