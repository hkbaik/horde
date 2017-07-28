# Orc Dashboard

## Features

 * Overview of orc network
 * Treemap view of orc network
 * Parent View : All nodes belonging to same public extended key
 * Node View : Node details

## Development

``` bash
$ git clone git@github.com:orcproject/horde.git
$ cd horde
$ npm install (or yarn)
$ npm run dev (or yarn run dev)
```

## How to customize theme

The theme can be customized by overriding [default variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) of antd style. The overriding variables are stored in /src/theme.less and new theme can be built as follows

``` bash
$ yarn run build-theme

or

$ npm run build-theme
```

## Build

### How to run as a webapp

```
$ npm install http-server -g
$ npm run build
$ http-server -p 5000 build
```

 * TODO: package as an electron app
