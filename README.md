# rollup-plugin-gherkin

[![NPM](https://img.shields.io/npm/v/rollup-plugin-gherkin.svg)](https://www.npmjs.com/package/rollup-plugin-gherkin)
[![Travis](https://img.shields.io/travis/call-a3/rollup-plugin-gherkin.svg)](https://travis-ci.org/call-a3/rollup-plugin-gherkin)
[![Codecov](https://img.shields.io/codecov/c/github/call-a3/rollup-plugin-gherkin.svg)](https://codecov.io/gh/call-a3/rollup-plugin-gherkin)
[![Greenkeeper badge](https://badges.greenkeeper.io/call-a3/rollup-plugin-gherkin.svg)](https://greenkeeper.io/)
[![David](https://img.shields.io/david/call-a3/rollup-plugin-gherkin.svg)](https://david-dm.org/call-a3/rollup-plugin-gherkin)
[![David Dev](https://img.shields.io/david/dev/call-a3/rollup-plugin-gherkin.svg)](https://david-dm.org/call-a3/rollup-plugin-gherkin?type=dev)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[Gherkin](https://github.com/cucumber/cucumber/tree/master/gherkin) plugin for [rollup](https://rollupjs.org)

## Installing

```bash
# npm
npm install -D rollup-plugin-gherkin
```

## Usage

This plugin will parse Gherkin syntax into pickles and transform them into an importable ES6 modules.
The default export will be an array of all pickles.

By default, this plugin will transform all `.feature` files (by defaulting to `**/*.feature` for the include option).
However, you can use the `include` and `exclude` options as per usual with rollup plugins.
