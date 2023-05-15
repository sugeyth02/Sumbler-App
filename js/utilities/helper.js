function searchValue(elements, property, value) {
  return elements.find((element) => element[property] === value);
}
const throttle = (callback, delay) => {
  let last = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    return callback(...args);
  };
};
export { searchValue, throttle };
