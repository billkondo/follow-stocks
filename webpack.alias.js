const path = require('path');

module.exports = {
  '@entities': path.join(__dirname, 'src/domain/entities'),
  '@errors': path.join(__dirname, 'src/domain/errors'),
  '@repositories': path.join(__dirname, 'src/domain/repositories'),
};