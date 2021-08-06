const isFalse = (value) => {
  return value === 0 ? false : !value;
};
export const cleanObject = (object) => {
  const newObject = { ...object };
  Object.keys(newObject).forEach((key) => {
    // console.log('---');
    if (isFalse(newObject[key])) {
      delete newObject[key];
    }
  });
  // console.log('newObject', newObject);
  return newObject;
};
