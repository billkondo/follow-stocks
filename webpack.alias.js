const path = require('path');

module.exports = {
  '@entities': path.join(__dirname, 'src/domain/entities'),
  '@errors': path.join(__dirname, 'src/domain/errors'),
  '@pages': path.join(__dirname, 'src/renderer/pages'),
  '@repositories': path.join(__dirname, 'src/domain/repositories'),
  '@usecases': path.join(__dirname, 'src/domain/usecases'),
};