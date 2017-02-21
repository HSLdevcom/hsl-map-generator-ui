## Install

Clone the repo via git

```bash
git clone https://github.com/HSLdevcom/hsl-map-generator-ui
```

Install dependencies

```bash
$ cd your-project-name && npm install
```


## Run

Start in development mode

```bash
$ npm start
```

Build and run in production mode without Docker

```bash
$ npm run build
$ npm run start-prod
```

Build and run in Docker container

```bash
$ docker build -t hsl-map-generator-ui .
$ docker run -d -p 0.0.0.0:3000:3000 hsl-map-generator-ui
```

*Note: requires a node version >= 4 and an npm version >= 2.*

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

#### Toggle Redux DevTools

- All platforms: <kbd>Ctrl+H</kbd>

*See [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more information.*

#### Redux Devtools Window

Now you can implement it using [remote-redux-devtools](https://github.com/zalmoxisus/remote-redux-devtools) with a [remote monitor](https://github.com/zalmoxisus/remote-redux-devtools#remote-monitoring) by yourself.


## Externals

If you use any 3rd party libraries which can't be built with webpack, you must list them in your `webpack.config.base.js`：

```javascript
externals: [
  // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
]
```


## CSS Modules

This project is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`


## License
MIT © [HSL](https://github.com/HSLdevcom)
