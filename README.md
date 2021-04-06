# react-bingo-game

This is a 1-25 Bingo game built with React

### Online Demo

https://react-bingo-game.vercel.app/

## Development

### Prerequisites
    node: >=10.16.0
    npm: >=6.9.0

### Common tasks
Below are the basic tasks that need to be run while developing this application. For more commands
please see the contents of [`package.json`](package.json).

#### Installation
    npm i

#### Starting the Frontend Dev Server
    npm start

#### Running tests
    npm run test

#### Creating production build
    npm run build

#### Testing production build locally
    npm run start:prod

## General

- keep the code style of the codebase uniform. When in doubt try to follow [Airbnbs Javascript Styleguide](https://github.com/airbnb/javascript)
- consider refraining from complex syntax. Keep the code simple and approachable.

## Linting & Formatting

The ESLint should be configured to follow the [Airbnb styleguide](https://www.npmjs.com/package/eslint-config-airbnb) with only minor changes.

Automatic formatting is done via [Prettier](https://prettier.io/) based on eslint rules.

## Testing

We use [Jest](https://jestjs.io/) as a testing framework.

[React testing library](https://testing-library.com/docs/react-testing-library/intro/) is the preferred way for testing React components.

- __try to write tests that closely resemble how your web pages are are interacted by the users__.
- avoid testing implementation details like the internals of a component you're testing (though it's still possible)
- if it relates to rendering components, then it should deal with DOM nodes rather than component instances

try to use snapshot tests as little as possible. Often times they are not really testing anything (only implementation), they are changing often and eventually are getting just updated without proper review. Use them as a last resort or in very special use cases.
