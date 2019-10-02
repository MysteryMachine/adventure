const withCSS = require('@zeit/next-css');
require('dotenv').config();
module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[path][name]__[local]',
  },
  publicRuntimeConfig: {
    FAUNA_DB_SECRET: process.env.FAUNA_DB_SECRET,
    FAUNA_DB_NAME: process.env.FAUNA_DB_NAME,
    FAUNA_SUB_DB_SECRET: process.env.FAUNA_SUB_DB_SECRET,
  },
});
