const innerThrow = () => {
  throw new Error('inner throw error!');
};

const outerReturn = () => {
  try {
    innerThrow();
  } catch (e) {
    return e;
  }
};

const outerThrow = () => {
  try {
    innerThrow();
  } catch (e) {
    throw e;
  }
};

const innerThrowAsync = async () => {
  throw new Error('inner throw async error!');
};

const outerReturnAsync = async () => {
  try {
    await innerThrowAsync();
  } catch (e) {
    return e;
  }
};

const outerThrowAsync = async () => {
  try {
    await innerThrowAsync();
  } catch (e) {
    throw e;
  }
};

const run = (isThrow = 0) => {
  try {
    if (isThrow) {
      outerThrow();
    }
    outerReturn();
  } catch (e) {
    console.log(`Run: ${e.message}`);
  }
};

const runAsync = async (isThrow = 0) => {
  try {
    if (isThrow) {
      await outerThrowAsync();
    }
    await outerReturnAsync();
  } catch (e) {
    console.log(`Run Async: ${e.message}`);
  }
};

const runUnhandled = (isThrow = 0) => {
  if (isThrow) {
    throw innerThrow();
  }
  return innerThrow();
};

const runUnhandledAsync = async (isThrow = 0) => {
  if (isThrow) {
    throw await innerThrowAsync();
  }
  return innerThrowAsync();
};

module.exports = {
  run,
  runAsync,
  runUnhandled,
  runUnhandledAsync,
};
