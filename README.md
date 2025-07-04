# HSL Map Generator UI

## Install

Clone the repo via git

```bash
git clone https://github.com/HSLdevcom/hsl-map-generator-ui
```

Install dependencies

```bash
$ cd hsl-map-generator-ui && yarn install
```

## Run

### Pre-step: Create Digitransit apikey

Create .env file and place your Digitransit apikey there. If you still don't have your own, generate one on https://portal-dev.digitransit.fi or https://portal.digitransit.fi (dev / prod). Without apikey the map won't work and generation will fail.

### Start in development mode

```bash
$ yarn start
```

Runs at http://localhost:3000/

### Build and run in production mode without Docker

```bash
$ yarn build
$ yarn serve
```

Runs at http://localhost:3000/

### Build and run in Docker container

```bash
$ docker build -t hsl-map-generator-ui .
$ docker run -d -p 3000:3000 hsl-map-generator-ui
```

\*Note: requires a node version >= 8.6.0

Uses REST APIs from [hsl-map-generator-server](https://github.com/HSLdevcom/hsl-map-generator-server) (kartat.hsl.fi).

### Run cypress tests

To run cypress tests use

```
./node_modules/.bin/cypress run
```

If you want to use the cypress ui for running tests use

```
./node_modules/.bin/cypress open
```

## License

AGPL-3.0-only © [HSL](https://github.com/HSLdevcom)
