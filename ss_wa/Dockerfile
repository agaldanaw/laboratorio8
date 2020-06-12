FROM mhart/alpine-node:11 AS builder
WORKDIR /sap_web_app
COPY . .
RUN yarn install --network-timeout 100000
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /sap_web_app
COPY --from=builder /sap_web_app/build .
CMD ["serve", "-p", "3000", "-s", "."]doc