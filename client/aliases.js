const path = require('path');

const aliases = {
  web: {
    '@root': path.resolve(__dirname, '/'),
    '@components': path.resolve(__dirname, 'components'),
    '@pages': path.resolve(__dirname, 'pages'),
    '@services': path.resolve(__dirname, 'services'),
    '@styles': path.resolve(__dirname, 'styles')
  }
};

module.exports = () => {
  return Object.keys(aliases).reduce((accum, parentName) => {
    Object.keys(aliases[parentName]).forEach((aliasName) => {
      if (typeof accum[aliasName] === 'undefined') {
        accum[aliasName] = aliases[parentName][aliasName];
      }
    });

    return accum;
  }, {});
};
