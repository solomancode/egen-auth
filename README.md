# Easy Generator Auth. System

## Prerequisites
- [yarn](https://yarnpkg.com/)
- [Docker & Docker Compose](https://docs.docker.com/desktop)
- [Turborepo](https://turbo.build/docs/getting-started/installation)

## environment
- remove .example from "packages/api/.env.example". example values should work fine

## Development
1. run mongodb container
```sh
docker compose --env-file packages/api/.env up mongodb -d
```
2. run api server
```sh
cd packages/api
yarn start:dev
```
3. run web application
```sh
cd apps/web
yarn dev
```
5. Open [http://localhost:7000](http://localhost:7000) with your browser to see the result.

## Production
1. run the following command
```sh
docker compose --env-file packages/api/.env up --build -d
```
