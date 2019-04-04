/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 *
 * @flow
 */

const fs = require('fs');
const path = require('path');
const logger = require('../logger');

module.exports = function getBabelConfig(cwd: string) {
  let babelrc;

  const file = path.join(cwd, '.babelrc');

  if (fs.existsSync(file)) {
    logger.info(`loaded babel-loader configuration: ${file}`);
    babelrc = { extends: file };
  } else {
    babelrc = {
      presets: [],
    };
  }

  return Object.assign({}, babelrc, {
    plugins: [require.resolve('./fixRequireIssues')]
      .concat(
        process.env.NODE_ENV === 'production'
          ? []
          : [
              // require.resolve('react-hot-loader/babel'),
              // require.resolve('../hot/babelPlugin'),
            ]
      )
      .concat(babelrc.plugins || []),
  });
};
