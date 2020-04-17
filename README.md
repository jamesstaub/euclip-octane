# euclip

`ember s --ssl-key "/Users/admin/.ssh/server.key" --ssl-cert "/Users/admin/.ssh/server.crt"`


## TODO:

Tracks 
- copy paste tracks
- new track menu (different init script types)

Track Controls
- wrapper: 
  - min, max default controls
  - "functions" [buttons to apply prest shapes like triangle, sine or randomize]
  - copy/paste single control
  - range presets (melodic scales, )
- element/nodes to implement
  - ADSR node : breakpoint nexus element
  - panner node : dial

Scripts
  - rebuild script controls (load, revert, defaults)
  - rebuild collection of example scripts

Files
  - set local filepath


## Documentation:

### writing scripts
- custom ui options

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd euclip`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying
