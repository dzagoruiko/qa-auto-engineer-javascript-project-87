import { describe, expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '__fixtures__', filename);

describe('gendiff', () => {
  test('should compare flat JSON files in stylish format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('should compare flat YAML files in stylish format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('should compare JSON and YAML files in stylish format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.yml');

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('should compare flat JSON files in plain format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
  });

  test('should compare flat JSON files in json format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');

    const diff = genDiff(filepath1, filepath2, 'json');
    const parsed = JSON.parse(diff);

    expect(parsed).toEqual({
      follow: { type: 'removed', value: false },
      host: { type: 'unchanged', value: 'hexlet.io' },
      proxy: { type: 'removed', value: '123.234.53.22' },
      timeout: { type: 'changed', oldValue: 50, newValue: 20 },
      verbose: { type: 'added', value: true },
    });
  });
});