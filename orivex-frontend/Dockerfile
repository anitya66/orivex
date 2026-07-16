# ==========================
# Stage 1 : Build React App
# ==========================

FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_RAZORPAY_KEY

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_RAZORPAY_KEY=$VITE_RAZORPAY_KEY

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ==========================
# Stage 2 : Nginx
# ==========================

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]