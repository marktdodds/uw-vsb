export default {
  classNames: (...classes) => {
    return classes.join(' ');
  },
  objectPathExists: (object, ...path) => {
    return path.reduce((prev, item) => prev !== false && prev.hasOwnProperty(item) ? prev[item] : false, object) !== false;
  },
  createObjectPath: (object, ...path) => {
    let prev = object;
    path.forEach((item) => {
      if (!prev.hasOwnProperty(item)) prev[item] = {};
      prev = prev[item];
    });
  },
  uniqueId: () => {
    return (new Date().getTime()*Math.random()*Math.random()).toString(16);
  }
}
