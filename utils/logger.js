/*
    The logger module is used to print information to the console. The module has two functions: info and error. The info function is used for general logging and the error function is used for error messages. The functions only print to the console if the environment variable NODE_ENV is not set to test. This is to prevent the console from being filled with unnecessary information during testing.
*/

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
