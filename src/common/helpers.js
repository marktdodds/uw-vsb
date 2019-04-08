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
    return (new Date().getTime() * Math.random() * Math.random()).toString(16);
  },
  
  integerToTime: (int) => {
    return `${Math.floor(int / 100)}:${Math.round(((int % 100) / 100) * 60).toLocaleString(undefined, {minimumIntegerDigits: 2})}`;
  },
  
  timeToInteger: (time) => {
    const split = time.split(':');
    if (split.length !== 2) throw Error('Invalid time');
    return parseInt(split[0]) * 100 + (parseInt(split[1]) / 60) * 100
  }
  
};
