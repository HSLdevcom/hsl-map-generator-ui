HSL Map Generator UI
====================

## Install

Clone the repo via git

```bash
git clone https://github.com/HSLdevcom/hsl-map-generator-ui
```

Install dependencies

```bash
$ cd hsl-map-generator-ui && npm install
```


## Run

### Start in development mode

```bash
$ npm start
```
Runs at http://localhost:3000/


### Build and run in production mode without Docker

```bash
$ npm run build
$ npm run start-prod
```
Runs at http://localhost:3000/


Build and run in Docker container

```bash
$ docker build -t hsl-map-generator-ui .
$ docker run -d -p 0.0.0.0:3000:3000 hsl-map-generator-ui
```

*Note: requires a node version >= 4 and an npm version >= 2.*

Uses REST APIs from [hsl-map-generator-server](https://github.com/HSLdevcom/hsl-map-generator-server) (kartat.hsl.fi).

## License
MIT © [HSL](https://github.com/HSLdevcom)
