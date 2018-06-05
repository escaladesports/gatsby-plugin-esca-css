# gatsby-plugin-styled-jsx-postcss

An opinionated Gatsby plugin to use styled-jsx with PostCSS. Comes prepackaged with:

- [postcss-import](https://www.npmjs.com/package/postcss-import)
- [postcss-cssnext](https://www.npmjs.com/package/postcss-nesting)
- [postcss-nested](https://www.npmjs.com/package/postcss-nested)
- [lost](https://www.npmjs.com/package/lost)

## Install

With Yarn:

```bash
yarn add gatsby-plugin-esca-css
```

Or with npm:

```bash
npm install --save gatsby-plugin-esca-css
```

## Usage

```javascript
// In your gatsby-config.js
plugins: [
  'gatsby-plugin-esca-css',
]
```

## Options

This plugin will also watch CSS files and refresh your browser on change if running in `develop` mode. This is because if you're importing other CSS files in your `<style>` tags, the browser will not refresh on its own. To disable this set a `watchCss` option to `false`.