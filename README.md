
localearn
=================

## Setup (one-time)

### Linux/Debian/Ubuntu
Ensure you have an updated version of nodejs and npm installed. Ubuntu repos often contain an old version, so it's recommend to use a more [up-to-date repo](https://launchpad.net/~chris-lea/+archive/node.js/).

If you already had nodejs installed and need it updated, make sure to `sudo apt-get update && sudo apt-get upgrade`. Otherwise a `sudo apt-get install nodejs npm` should be sufficient.

*On Ubuntu / Debian engines, there are minor issues with more recent versions of Gulp. To be safe, use package-old.json on these OS.*

`sudo mv package-old.json package.json`

### Mac
`brew install node`

### Windows
Install node from [http://nodejs.org/download/](http://nodejs.org/download/) and open the node command prompt.

## Installation

Assuming nodejs/npm is correctly installed, the next step is to install gulp with and then all the project dependencies, along with yarn.

```
sudo npm -g install gulp yarn
```

Finally, install all dependencies with yarn:

```
yarn
```

## Development

To use the default dev task, which launches a local server on SERVER_PORT for preview, run gulp:

```
gulp
```

This will compile the site to ./docs/ (or whatever is defined as `basePaths.dest` in gulpfile.js). To instruct gulp to compile for production, pass `--prod` and possibly `gulp bundle` to compress it into a zip. For example:

```
gulp build --prod && gulp bundle
```


