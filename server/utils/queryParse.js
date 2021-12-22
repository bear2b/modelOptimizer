

const queryParse = (queryObj) => 
  Object.keys(queryObj).map((key) => [key, queryObj[key]])
  .flat(1).join(' ');

module.exports = queryParse;