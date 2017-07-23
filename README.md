# Orc Dashboard

## Features

 * [Overview of orc network](http://imgur.com/SYBFT8q)
 * [Parent View](http://imgur.com/hKS87k2) : All nodes belonging to same public extended key
 * [Node View](http://imgur.com/2FF140v) : Node details

## Development

``` bash
$ git clone git@github.com:jhonghee/orc-dashboard.git
$ cd orc-dashboard
$ npm install
$ npm run dev
```
**NOTE** : Until CORS is enabled, please use 'json-server'

``` bash
$ npm install -g json-server
$ json-server --watch db.json
``` 

## Build

### How to run as a webapp

```
$ npm install http-server -g
$ npm run build
$ http-server -p 5000 build
```

 * TODO: package as an electron app
