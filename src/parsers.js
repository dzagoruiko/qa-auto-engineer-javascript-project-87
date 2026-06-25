import fs from 'fs';
import * as yaml from 'js-yaml';

const getFileFormat = (filepath) => {
  const parts = filepath.split('.');
  return parts[parts.length - 1];
};

const parseFile = (filepath) => {
  const format = getFileFormat(filepath);
  const data = fs.readFileSync(filepath, 'utf-8');

  if (format === 'json') {
    return JSON.parse(data);
  }

  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file format: ${format}`);
};

export default parseFile;