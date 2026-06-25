import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  const diff = buildDiff(data1, data2);
  
  return stylish(diff);
};

export default genDiff;